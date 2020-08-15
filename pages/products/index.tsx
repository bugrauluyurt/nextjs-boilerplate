import React from "react";
import { compose } from "redux";
import styles from "./products.module.scss";
import { withTranslation } from "../../i18n";
import withRouteProtection from "../../src/components/HOCs/withRouteProtection";

const Products = ({ t }): JSX.Element => {
    return (
        <>
            <div className={styles["text-red"]}>This is the products page.</div>
        </>
    );
};

Products.getInitialProps = async () => {
    console.log("******* [getInitialProps][Products] *********");
    return {
        namespacesRequired: ["common"],
    };
};

export default compose(
    withRouteProtection,
    withTranslation("common")
)(Products);
