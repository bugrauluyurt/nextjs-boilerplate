import { useState, useEffect, useMemo } from "react";
import { isArray, includes } from "lodash-es";
import { isClient } from "@utils/isClient";
import SocketService from "../services/socket.service";
import { LoggerService } from "../services/logger.service";
import { SOCKET_DEFAULT_EVENTS } from "../constants/socket.events";

const handleConnect = (socketInstance: SocketIOClient.Socket) => {
    if (!socketInstance.connected) {
        socketInstance.connect();
    }
};

const handleDisconnect = (socketInstance: SocketIOClient.Socket) => {
    if (!socketInstance.disconnected) {
        socketInstance.disconnect();
    }
};

const handleCustomEventResponse = (eventName: string, prevState: any, serverResponse: any) => {
    const previousData = prevState.serverResponse[eventName] || [];
    let nextData = [...previousData];
    if (isArray(serverResponse)) {
        nextData = nextData.concat(serverResponse);
    } else if (serverResponse) {
        nextData.push(serverResponse);
    }
    const nextResponseData = { ...prevState.serverResponse, [eventName]: nextData };
    return { ...prevState, serverResponse: nextResponseData };
};

const handleSocketIoEventResponse = (eventName: string, prevState: any, serverResponse: any) => {
    let nextEventResponse = serverResponse;
    if (
        eventName === SOCKET_DEFAULT_EVENTS.CONNECT ||
        eventName === SOCKET_DEFAULT_EVENTS.RECONNECT_FAILED ||
        eventName === SOCKET_DEFAULT_EVENTS.CONNECT_TIMEOUT
    ) {
        nextEventResponse = true;
    }
    return { ...prevState, [eventName]: nextEventResponse };
};

const defaultOptions = {
    apiUrl: process.env.SOCKET_API_URL,
    autoDisconnectionEnabled: true,
    storeEmittedEvents: false,
};

export const useSocket = (
    namespace: string,
    eventNames: string[] = [],
    customOptions = defaultOptions,
    socketIoOptions = {}
) => {
    const options = useMemo(() => {
        return { ...defaultOptions, ...customOptions };
    }, [customOptions]);
    const [data, setData] = useState({
        serverResponse: {},
        acknowledgementServerResponse: {},
        emitting: false,
        lastEmittedAt: undefined,
        connect: false,
        connect_error: undefined,
        connect_timeout: false,
        reconnect: 0,
        reconnect_attempt: 0,
        reconnecting: 0,
        reconnect_error: undefined,
        reconnect_failed: false,
    });
    // Socket instance here is not going to get created every time. It is going to point to the
    // same instance controlled inside the singleton socket service
    let socketInstance: SocketIOClient.Socket;
    if (isClient()) {
        socketInstance = SocketService.createConnection(namespace, options.apiUrl, socketIoOptions);
    }
    const registerListeners = useMemo(() => {
        return () => {
            const defaultEvents = Object.values(SOCKET_DEFAULT_EVENTS);
            eventNames.concat(defaultEvents).forEach(eventName => {
                socketInstance.on(eventName, (serverResponse: any) => {
                    setData(state => {
                        // If SocketIO events
                        if (includes(defaultEvents, eventName)) {
                            return handleSocketIoEventResponse(eventName, state, serverResponse);
                        }
                        // Custom registered events
                        return handleCustomEventResponse(eventName, state, serverResponse);
                    });
                });
            });
        };
    }, [eventNames]);
    const handleEmit = (eventName: string, args: any[], ack?: () => any) => {
        setData(state => ({ ...state, emitting: true }));
        const emitArgs = [
            ...args,
            () => {
                if (ack) {
                    ack();
                }
                setData(state => {
                    return { ...state, lastEmittedAt: Date.now(), emitting: false };
                });
            },
        ];
        socketInstance.emit(eventName, ...emitArgs);
    };
    useEffect(() => {
        registerListeners();
        return () => {
            if (socketInstance && socketInstance.disconnect && options.autoDisconnectionEnabled) {
                LoggerService.log(`[Socket] Disconnected from ${options.apiUrl}/${namespace}`);
                socketInstance.disconnect();
            }
        };
    }, []);
    return {
        connected: socketInstance?.connected || false,
        disconnected: socketInstance?.disconnected || false,
        ...data,
        connect: handleConnect,
        disconnect: handleDisconnect,
        emit: handleEmit,
    };
};
