import * as React from "react";
import { useMemo } from "react";
import { includes } from "lodash-es";
import { withTranslation } from "../../../i18n";
import IAuthenticationErrorComponent from "./authentication-error.interface";

const AuthenticationError: React.FC<IAuthenticationErrorComponent.IProps> = (props): JSX.Element => {
    const { errorKey, t } = props;
    const isValidErrorKey = useMemo(() => {
        return includes(IAuthenticationErrorComponent.AuthenticationError, errorKey);
    }, [errorKey]);
    return (
        <>
            <div className="text-red-700 font-bold bg-red-100 p-2 mb-4 text-center rounded">
                {t(`authentication_error_${isValidErrorKey ? errorKey : "DEFAULT"}`)}
            </div>
        </>
    );
};

export default withTranslation("common")(AuthenticationError);
