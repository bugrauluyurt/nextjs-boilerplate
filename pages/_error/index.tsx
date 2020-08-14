// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { withTranslation } from "../../i18n";
import { IErrorPage } from "../../src/types/error-page.interface";

const Error: NextPage<IErrorPage.IProps, IErrorPage.InitialProps> = ({
    t,
    statusCode,
}) => {
    return (
        <div>
            Error occurred
            {statusCode}
        </div>
    );
};

Error.getInitialProps = async ({ res, err }) => {
    let statusCode;

    if (res) {
        ({ statusCode } = res);
    } else if (err) {
        ({ statusCode } = err);
    }

    return {
        namespacesRequired: ["common"],
        statusCode,
    };
};

export default withTranslation("common")(Error);
