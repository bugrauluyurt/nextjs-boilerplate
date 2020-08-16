import { BaseConnection } from "./connectionBase";
import { ConnectionTypes } from "./connectionTypes";
import { IConnection } from "./connection";

class ConnectionFactory {
    // eslint-disable-next-line class-methods-use-this
    create(connectionType: ConnectionTypes = ConnectionTypes.BASE_CONNECTION): IConnection {
        switch (connectionType) {
            case ConnectionTypes.BASE_CONNECTION:
                return new BaseConnection(process.env.API_URL);
            // Other connection cases can be written here
            default:
                return new BaseConnection();
        }
    }
}
export default new ConnectionFactory();
