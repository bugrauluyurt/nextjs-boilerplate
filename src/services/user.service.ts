import { AxiosRequestConfig } from "axios";
import { IConnection } from "@services/connections/connection";
import ConnectionFactory from "@services/connections/connectionFactory";
import { RequestMethod } from "@services/connections/connectionBase";
import { IAnyObject } from "../types/any-object.type";
import { IUser } from "../types/user.interface";
import { ILoginParams } from "../types/login-params.interface";
import { IRegisterParams } from "../types/register-params.interface";

class UserService {
    private connection: IConnection = ConnectionFactory.create();

    getRequestConfig(): AxiosRequestConfig {
        return this.connection.getRequestConfig();
    }

    getUser(requestConfig?: AxiosRequestConfig | IAnyObject): Promise<IUser> {
        return this.connection.request("users/currentUser", RequestMethod.GET, undefined, undefined, requestConfig);
    }

    getUserById(userId: string): Promise<IUser> {
        return this.connection.request(`users/${userId}`, RequestMethod.GET, undefined, undefined, undefined);
    }

    loginUser(body: ILoginParams): Promise<IUser> {
        return this.connection.request("auth/local/login", RequestMethod.POST, undefined, body);
    }

    logoutUser(): Promise<void> {
        return this.connection.request("auth/local/logout", RequestMethod.POST, undefined, undefined, undefined);
    }

    registerUser(body: IRegisterParams): Promise<IUser> {
        return this.connection.request("auth/local/signup", RequestMethod.POST, undefined, body, undefined);
    }
}

export default new UserService();
