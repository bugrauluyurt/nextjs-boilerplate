import * as socketIo from "socket.io-client";
import { LoggerService } from "./logger.service";

class SocketService {
    private socketConnections: { [key: string]: SocketIOClient.Socket } = {};

    createConnection(namespace: string, apiUrl = process.env.SOCKET_API_URL) {
        const uniqueIdentifier = `${apiUrl}_${namespace}`;
        if (this.socketConnections[uniqueIdentifier]) {
            LoggerService.log(
                `[Socket] Connection from ${apiUrl} is not recreated. It already exists. Returning existing instance...`
            );
            return this.socketConnections[uniqueIdentifier];
        }
        const url = `${apiUrl}/${namespace}`;
        this.socketConnections[uniqueIdentifier] = socketIo.connect(url);
        return this.socketConnections[uniqueIdentifier];
    }
}

export default new SocketService();
