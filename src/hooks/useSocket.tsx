import { useState, useEffect } from "react";
import { isArray } from "lodash-es";
import SocketService from "../services/socket.service";
import { LoggerService } from "../services/logger.service";

export const useSocket = (
    namespace: string,
    eventNames: string[],
    autoDisconnectionEnabled = true,
    apiUrl = process.env.SOCKET_API_URL
) => {
    const initialData = () => {
        return eventNames.reduce((acc, eventName) => {
            return { [eventName]: [] };
        }, {});
    };
    const [data, setData] = useState(initialData);
    // Socket instance here is not going to get created every time. It is going to point to the
    // same instance controlled inside the singleton socket service
    const socketInstance = SocketService.createConnection(namespace, apiUrl);
    useEffect(() => {
        const registerDefaultListeners = () => {

        };
        const registerCustomListeners = () => {
            eventNames.forEach(eventName => {
                socketInstance.on(eventName, (serverData: any) => {
                    setData(prevStateData => {
                        const previousData = prevStateData[eventName];
                        let nextData = [...previousData];
                        if (isArray(serverData)) {
                            nextData = nextData.concat(serverData);
                        } else if (serverData) {
                            nextData.push(serverData);
                        }
                        return { ...prevStateData, [eventName]: nextData };
                    });
                });
            });
        };
        registerDefaultListeners();
        registerCustomListeners();
        return () => {
            if (socketInstance && socketInstance.disconnect && autoDisconnectionEnabled) {
                LoggerService.log(`[Socket] Disconnected from ${apiUrl}/${namespace}`);
                socketInstance.disconnect();
            }
        };
    }, [namespace, apiUrl, autoDisconnectionEnabled, eventNames, socketInstance]);

    return {
        connected: socketInstance?.connected || false,
        disconnected: socketInstance?.disconnected || false,
        data,
    };
};
