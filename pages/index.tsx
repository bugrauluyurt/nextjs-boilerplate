import React from "react";
import { ROUTE_EDITOR } from "@constants/routes.constant";
import { withTranslation, Router } from "../i18n";

const Home = ({ t }): JSX.Element => {
    return (
        <div className="flex justify-center items-center flex-col">
            <div className="mb-2">[Home-Page]</div>
            <div className="navigation-btn">
                <button
                    className="btn btn-primary-1 ripple"
                    type="button"
                    onClick={() => Router.push(`/${ROUTE_EDITOR}`)}
                >
                    {t("to-editor")}
                </button>
            </div>
        </div>
    );
};

Home.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

export default withTranslation("common")(Home);
