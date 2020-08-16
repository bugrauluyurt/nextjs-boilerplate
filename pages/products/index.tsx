import React from "react";
import { compose } from "redux";
import { isClient } from "@utils/isClient";
import styles from "./products.module.scss";
import { withTranslation } from "../../i18n";
import withRouteProtection from "../../src/components/HOCs/withRouteProtection";
import { LoggerService } from "../../src/services/logger.service";

const Products = ({ t }): JSX.Element => {
    return (
        <>
            <div className={styles["text-red"]}>This is the products page.</div>
        </>
    );
};

Products.getInitialProps = async () => {
    // eslint-disable-next-line prettier/prettier
    LoggerService.log(`${isClient() ? "[Client]": "[Server]"} [Products] getInitialProps called...`);
    return {
        namespacesRequired: ["common"],
    };
};

export default compose(
    withRouteProtection,
    withTranslation("common")
)(Products);
