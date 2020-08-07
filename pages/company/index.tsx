import React, { useEffect, useState } from "react";
import { withTranslation } from "../../i18n";

const Company = ({ t }): JSX.Element => {
    return (
        <>
            <div>This is the company page.</div>
        </>
    );
};

Company.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

export default withTranslation("common")(Company);
