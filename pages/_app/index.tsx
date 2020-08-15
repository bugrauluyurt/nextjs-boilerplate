import React from "react";
import App, { AppContext } from "next/app";
import { ReactQueryDevtools } from "react-query-devtools";
import UserService from "@services/user.service";
import { get as _get, isEmpty as _isEmpty } from "lodash-es";
import cookie from "cookie";
import { AxiosRequestConfig } from "axios";
import serializeCookies from "@utils/serializeCookies";
import { ROUTE_AUTHENTICATION } from "@constants/routes.constant";
import isProtectedRoute from "@utils/isProtectedRoute";
import { appWithTranslation } from "../../i18n";
import wrapper from "../../src/store/store";
import "../../styles/globals.css";
import "../../styles/main.scss";
import { UserActions } from "../../src/store/user/actions";
import { IUser } from "../../src/types/user.interface";
import { LoggerService } from "../../src/services/logger.service";

const MyApp = ({ Component, pageProps }) => {
    return (
        <div className="app-root light-theme">
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
        </div>
    );
};

const setUserToStore = async (
    appContext: AppContext
): Promise<IUser | undefined> => {
    const rawCookies = _get(appContext, "ctx.req.headers.cookie", "");
    const reqCookies = cookie.parse(rawCookies);
    let user;
    if (reqCookies["connect.sid"]) {
        const requestConfig: AxiosRequestConfig = UserService.getRequestConfig();
        requestConfig.headers.cookie = serializeCookies({
            ...cookie.parse(requestConfig.headers.cookie || ""),
            ...reqCookies,
        });
        user = await UserService.getUser(requestConfig).catch(() => undefined);
        appContext.ctx.store.dispatch(
            UserActions.SetUser(_isEmpty(user?.data) ? undefined : user.data)
        );
    }
    return user;
};

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    const user = await setUserToStore(appContext);
    LoggerService.log(
        // eslint-disable-next-line prettier/prettier
        `${appContext.ctx?.res ? "[Server]" : "[Client]"}[App] getInitialProps called...`
    );
    const protectedRoute = isProtectedRoute(appContext?.ctx.pathname);
    if (appContext.ctx?.res && _isEmpty(user) && protectedRoute) {
        LoggerService.log(
            "[Server] User does not exist. Redirecting to [lang]/authentication..."
        );
        const lang = `${appContext?.ctx?.req["language"]}`;
        // @TODO: Fix pathname error. Translated redirections does not work.
        // @TODO: You can get the language directly from ctx.req.lng.
        appContext?.ctx?.res.writeHead(301, {
            Location: `${
                lang === "en" ? "" : `/${lang}`
            }/${ROUTE_AUTHENTICATION}`,
        });
        appContext?.ctx?.res.end();
    }
    return { ...appProps };
};

const wrapped = wrapper.withRedux(appWithTranslation(MyApp));
export default wrapped;
