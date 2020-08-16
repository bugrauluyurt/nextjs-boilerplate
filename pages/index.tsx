import React from "react";
import { withTranslation, Router } from "../i18n";

const Home = ({ t }): JSX.Element => {
    return (
        <div className="flex justify-center items-center flex-col">
            <div className="mb-2">[Home-Page]</div>
            <div className="navigation-btn">
                <button className="btn btn-primary-1 ripple" type="button" onClick={() => Router.push("/products")}>
                    {t("to-products")}
                </button>
            </div>
        </div>
    );
};

Home.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

export default withTranslation("common")(Home);
