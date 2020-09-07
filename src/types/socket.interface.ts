/* eslint-disable camelcase */
type SocketEvent = { [eventName: string]: any };
export interface SocketData {
    connected: boolean;
    disconnected: boolean;
    events: { client: SocketEvent; server: SocketEvent };
    connect: (socketInstance: SocketIOClient.Socket) => void;
    disconnect: (socketInstance: SocketIOClient.Socket) => void;
    emit: (eventName: string, args: any[]) => void;
    getResponse: (eventName: string) => any | any[];
    connect_error: any;
    connect_timeout: boolean;
    reconnect: number;
    reconnect_attempt: number;
    reconnecting: number;
    reconnect_error: any;
    reconnect_failed: boolean;
}
