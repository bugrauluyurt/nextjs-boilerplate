import { AxiosRequestConfig } from "axios";
import { IConnection } from "@services/connections/connection";
import ConnectionFactory from "@services/connections/connectionFactory";
import { RequestMethod } from "@services/connections/connectionBase";
import { AnyObject } from "../types/any-object.type";
import { User } from "../types/user.interface";
import { LoginParams } from "../types/login-params.interface";
import { RegisterParams } from "../types/register-params.interface";

class UserService {
    private connection: IConnection = ConnectionFactory.create();

    getRequestConfig(): AxiosRequestConfig {
        return this.connection.getRequestConfig();
    }

    getUser(requestConfig?: AxiosRequestConfig | AnyObject): Promise<User> {
        return this.connection.request(
            "users/currentUser",
            RequestMethod.GET,
            undefined,
            undefined,
            requestConfig,
            true
        );
    }

    getUserById(userId: string): Promise<User> {
        return this.connection.request(
            `users/${userId}`,
            RequestMethod.GET,
            undefined,
            undefined,
            undefined,
            true
        );
    }

    loginUser(body: LoginParams): Promise<User> {
        return this.connection.request(
            "auth/local/login",
            RequestMethod.POST,
            undefined,
            body,
            undefined,
            true
        );
    }

    logoutUser(): Promise<void> {
        return this.connection.request(
            "auth/local/logout",
            RequestMethod.POST,
            undefined,
            undefined,
            undefined,
            true
        );
    }

    registerUser(body: RegisterParams): Promise<User> {
        return this.connection.request(
            "auth/local/register",
            RequestMethod.POST,
            undefined,
            body,
            undefined,
            true
        );
    }
}

export default new UserService();
