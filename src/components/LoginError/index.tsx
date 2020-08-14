import * as React from "react";
import { withTranslation } from "../../../i18n";
import ILoginErrorComponent from "./login-error.interface";

const LoginError: React.FC<ILoginErrorComponent.IProps> = (
    props
): JSX.Element => {
    const { errorKey, t } = props;
    return (
        <>
            <div className="text-red-700 font-bold bg-red-100 p-2 mb-4 text-center rounded">
                {t(`login_error_${errorKey || "DEFAULT"}`)}
            </div>
        </>
    );
};

export default withTranslation("common")(LoginError);
