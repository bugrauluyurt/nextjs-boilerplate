import * as socketIo from "socket.io-client";
import { LoggerService } from "./logger.service";

class SocketService {
    private socketConnections: { [key: string]: SocketIOClient.Socket } = {};

    createConnection(namespace: string, options = {}) {
        const uniqueIdentifier = namespace;
        if (this.socketConnections[uniqueIdentifier]) {
            return this.socketConnections[uniqueIdentifier];
        }
        const url = `/${namespace}`;
        const args: any[] = [url, { ...options }];
        LoggerService.log(`[Socket] Connecting to url ${url}`);
        this.socketConnections[uniqueIdentifier] = socketIo.connect(...args);
        return this.socketConnections[uniqueIdentifier];
    }
}

export default new SocketService();
