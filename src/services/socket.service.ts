import { LoggerService } from "./logger.service";

interface SocketConnection {
    connection: any;
    timeout: () => void;
}

// @TODO: Better to create a provider for socket
class Socket {
    private socketConnections: { [key: string]: any } = {};

    createConnection(apiUrl: string) {
        if (this.socketConnections[apiUrl]) {
            LoggerService.log(`[Socket] Connection from ${apiUrl} is not recreated. Timeout reset`);
        }
    }
}

export default new Socket();
