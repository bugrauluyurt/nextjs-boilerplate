import React from "react";
import { withTranslation, Router } from "../i18n";

const Home = ({ t }): JSX.Element => {
    return (
        <>
            <div>{t("welcome")}</div>
            <div className="navigation-btn">
                <button type="button" onClick={() => Router.push("/products")}>
                    {t("to-products")}
                </button>
            </div>
        </>
    );
};

Home.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

export default withTranslation("common")(Home);
