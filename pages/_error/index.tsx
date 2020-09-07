// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { withTranslation } from "../../i18n";
import { IErrorPage } from "../../src/types/error-page.interface";
import { LoggerService } from "../../src/services/logger.service";

const Error: NextPage<IErrorPage.IProps, IErrorPage.InitialProps> = ({ t, statusCode }) => {
    return (
        <div>
            Error occurred
            {statusCode}
        </div>
    );
};

Error.getInitialProps = async props => {
    let statusCode;
    if (props?.res) {
        statusCode = props?.res?.statusCode;
        ({ statusCode } = props?.res);
    } else if (props?.err) {
        LoggerService.log(props?.err);
        statusCode = props?.err?.statusCode;
    }

    return {
        namespacesRequired: ["common"],
        statusCode,
    };
};

export default withTranslation("common")(Error);
