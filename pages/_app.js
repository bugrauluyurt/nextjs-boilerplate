import React from "react";
import App from "next/app";
import { appWithTranslation } from "../i18n";
import wrapper from "../src/store/store";
import "../styles/globals.css";
import "../styles/main.scss";

/* eslint-disable */
const MyApp = ({ Component, pageProps }) => {
    return (
        <div className="app-root light-theme">
            <Component {...pageProps} />
        </div>
    );
};

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps }
}

const wrapped = wrapper.withRedux(appWithTranslation(MyApp));
export default wrapped;
/* eslint-enable */
