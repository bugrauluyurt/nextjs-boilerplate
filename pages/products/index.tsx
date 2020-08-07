import React, { useEffect, useState } from "react";
import { withTranslation } from "../../i18n";

const Products = ({ t }): JSX.Element => {
    return (
        <>
            <div>This is the products page.</div>
        </>
    );
};

Products.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

export default withTranslation("common")(Products);
