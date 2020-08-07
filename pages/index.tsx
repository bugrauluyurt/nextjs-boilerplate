import Head from "next/head";
import React from "react";
import { withTranslation, i18n, Router } from "../i18n";

const Home = ({ t }): JSX.Element => {
    return (
        <div>
            <Head>
                <title>papersmart</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div>{t("welcome")}</div>
                <div className="language-switcher">
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
