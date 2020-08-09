import React, { useEffect, useState } from "react";
import styles from "./products.module.scss";
import { withTranslation } from "../../i18n";

const Products = ({ t }): JSX.Element => {
    return (
        <>
            <div className={styles["text-red"]}>This is the products page.</div>
        </>
    );
};

Products.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

export default withTranslation("common")(Products);
