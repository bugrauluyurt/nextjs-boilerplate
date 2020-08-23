import { useState, useEffect, useMemo } from "react";
import { isArray } from "lodash-es";
import { isClient } from "@utils/isClient";
import SocketService from "../services/socket.service";
import { LoggerService } from "../services/logger.service";
import { SOCKET_NS_GENERIC_EVENTS } from "../constants/socket/ns-generic.constant";

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

const handleEventResponse = (eventName: string, prevState: any, serverResponse: any) => {
    const previousData = prevState.server_response[eventName] || [];
    let nextData = [...previousData];
    if (isArray(serverResponse)) {
        nextData = nextData.concat(serverResponse);
    } else if (serverResponse) {
        nextData.push(serverResponse || Date.now());
    }
    const nextResponseData = { ...prevState.server_response, [eventName]: nextData };
    return { ...prevState, server_response: nextResponseData };
};

const defaultOptions = {
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
        server_response: {},
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
        socketInstance = SocketService.createConnection(namespace, socketIoOptions);
    }

    const registerListeners = useMemo(() => {
        return () => {
            const defaultEvents = Object.values(SOCKET_NS_GENERIC_EVENTS.SERVER);
            eventNames.concat(defaultEvents).forEach(eventName => {
                socketInstance.on(eventName, (serverResponse: any) => {
                    setData(state => {
                        return handleEventResponse(eventName, state, serverResponse);
                    });
                });
            });
        };
    }, [eventNames]);

    const handleEmit = (eventName: string, args: any[]) => {
        socketInstance.emit(eventName, ...args);
    };

    useEffect(() => {
        registerListeners();
        return () => {
            if (socketInstance && socketInstance.disconnect && options.autoDisconnectionEnabled) {
                LoggerService.log(`[Socket] Disconnected from /${namespace}`);
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
