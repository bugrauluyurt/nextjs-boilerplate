import { AxiosInstance, AxiosRequestConfig } from "axios";
import { isObject } from "lodash-es";
import { IConnection } from "@services/connections/connection";
import { LoggerService } from "@services/logger.service";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios");

const AXIOS_BASE_CONFIG = {
    baseURL: process.env.API_URL || "/rest",
    headers: {
        "Cache-Control": "no-store",
        Pragma: "no-cache",
        Accept: "application/json",
        "Content-Type": "application/json",
    },
} as AxiosRequestConfig;

export enum RequestMethod {
    POST = "post",
    GET = "get",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch",
}

export class BaseConnection implements IConnection {
    private authorization: string | undefined;

    private connectionInstance: AxiosInstance;

    private defaultRequestConfig: AxiosRequestConfig = {};

    constructor(
        baseUrl?: string,
        authorization?: string,
        requestConfig?: AxiosRequestConfig
    ) {
        const config = {
            ...AXIOS_BASE_CONFIG,
            ...requestConfig,
        };
        if (baseUrl) {
            config.baseURL = baseUrl;
        }
        this.authorization = authorization;
        if (this.authorization) {
            config.headers.Authorization = this.authorization;
        }
        this.defaultRequestConfig = config;
        this.connectionInstance = axios.create(config);
        this.setInterceptors();
    }

    getRequestConfig(): AxiosRequestConfig {
        return this.defaultRequestConfig;
    }

    private setInterceptors(): void {
        this.connectionInstance.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                LoggerService.log(error, "error");
                return Promise.reject(error);
            }
        );
    }

    static sanitizeParams(params?: any): { [key: string]: any } {
        if (!params || !isObject(params)) {
            return {};
        }
        return Object.keys(params).reduce((acc, paramKey) => {
            // @ts-ignore
            const value: any = params[paramKey];
            if (!value) {
                return acc;
            }
            return { ...acc, [paramKey]: value };
        }, {});
    }

    request(
        url: string,
        method: RequestMethod,
        params?: any,
        body?: any,
        // eslint-disable-next-line @typescript-eslint/ban-types
        requestConfig?: AxiosRequestConfig | object,
        rejectionDisabled = false
    ): Promise<any> {
        const config = {
            url,
            method,
            params: BaseConnection.sanitizeParams(params),
            ...this.defaultRequestConfig,
            ...requestConfig,
        } as AxiosRequestConfig;
        if (body) {
            const isFormData = body instanceof FormData;
            if (isFormData) {
                config.headers["Content-Type"] = "multipart/form-data";
            }
            config.data =
                !isFormData && isObject(body)
                    ? JSON.stringify(body)
                    : body || "";
        }
        return new Promise<any>((resolve, reject) => {
            this.connectionInstance
                .request(config)
                .then(response => resolve(response))
                .catch(error => {
                    // @TODO Sentry.io integration should come here
                    if (rejectionDisabled) {
                        return resolve(error?.response?.data);
                    }
                    const e = {
                        ...new Error(),
                        ...(error?.response?.data || {}),
                    };
                    return reject(e);
                });
        });
    }
}
