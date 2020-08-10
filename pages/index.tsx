import Head from "next/head";
import React from "react";
import NProgress from "nprogress";
import { withTranslation, Router } from "../i18n";

// @TODO: Carry these events into another module.
Router.events.on("routeChangeStart", url => {
    console.log(`Loading: ${url}`);
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Home = ({ t }): JSX.Element => {
    return (
        <div>
            <Head>
                {/* Import CSS for nprogress */}
                <link rel="stylesheet" type="text/css" href="/nprogress.css" />
                <title>papersmart</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div>{t("welcome")}</div>
                <div className="navigation-btn">
                    <button
                        type="button"
                        onClick={() => Router.push("/products")}
                    >
                        {t("to-products")}
                    </button>
                </div>
            </main>
        </div>
    );
};

Home.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

export default withTranslation("common")(Home);
