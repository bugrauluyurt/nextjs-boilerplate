import React from "react";
import App, { AppContext } from "next/app";
import UserService from "@services/user.service";
import { get as _get, isEmpty as _isEmpty } from "lodash-es";
import cookie from "cookie";
import Locale from "@enums/locale.enum";
import Head from "next/head";
import { AxiosRequestConfig } from "axios";
import NProgress from "nprogress";
import serializeCookies from "@utils/serializeCookies";
import { ROUTE_AUTHENTICATION } from "@constants/routes.constant";
import isProtectedRoute from "@utils/isProtectedRoute";
import { isClient } from "@utils/isClient";
import { appWithTranslation, Router } from "../../i18n";
import wrapper from "../../src/store/store";
import "../../styles/globals.css";
import "../../styles/main.scss";
import { UserActions } from "../../src/store/user/actions";
import { IUser } from "../../src/types/user.interface";
import { LoggerService } from "../../src/services/logger.service";

Router.events.on("routeChangeStart", url => {
    LoggerService.log(`[routeChange] Route change started with ${url}`);
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                {/* Import CSS for nprogress */}
                <link rel="stylesheet" type="text/css" href="/nprogress.css" />
                <title>papersmart</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div id="app-root" className="app-root light-theme">
                    <Component {...pageProps} />
                </div>
            </main>
        </>
    );
};

const setUserToStore = async (appContext: AppContext): Promise<IUser | undefined> => {
    const rawCookies = _get(appContext, "ctx.req.headers.cookie", "");
    const reqCookies = cookie.parse(rawCookies);
    let user;
    // Only works if it is server side
    if (reqCookies["connect.sid"]) {
        const requestConfig: AxiosRequestConfig = UserService.getRequestConfig();
        requestConfig.headers.cookie = serializeCookies({
            ...cookie.parse(requestConfig.headers.cookie || ""),
            ...reqCookies,
        });
        user = await UserService.getUser(requestConfig).catch(() => undefined);
        appContext.ctx.store.dispatch(UserActions.SetUser(_isEmpty(user?.data) ? undefined : user.data));
    }
    return user;
};

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    // User is setToStore only at server side.
    const user = await setUserToStore(appContext);
    const logPrefix = isClient() ? "[Client]" : "[Server]";
    LoggerService.log(
        // eslint-disable-next-line prettier/prettier
        `${logPrefix} [App] getInitialProps called...`
    );
    const protectedRoute = isProtectedRoute(appContext?.ctx.pathname);
    // eslint-disable-next-line prettier/prettier
    LoggerService.log(`${logPrefix} Router ${appContext?.ctx.asPath} is ${protectedRoute ? "" : "NOT "}a protected route.`);
    if (appContext.ctx?.res && _isEmpty(user) && protectedRoute) {
        const lang = `${appContext?.ctx?.req["language"]}`;
        LoggerService.log(`[Server] User does not exist. Redirecting to ${lang}/authentication...`);
        appContext?.ctx?.res.writeHead(301, {
            Location: `${lang === Locale.EN ? "" : `/${lang}`}/${ROUTE_AUTHENTICATION}`,
        });
        appContext?.ctx?.res.end();
    }
    return { ...appProps };
};

const wrapped = wrapper.withRedux(appWithTranslation(MyApp));
export default wrapped;
