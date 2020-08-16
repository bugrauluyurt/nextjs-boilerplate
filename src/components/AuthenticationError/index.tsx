import * as React from "react";
import { useMemo } from "react";
import { includes } from "lodash-es";
import { withTranslation } from "../../../i18n";
import IAuthenticationErrorComponent from "./authentication-error.interface";
import GenericError from "../GenericError/index";

const AuthenticationError: React.FC<IAuthenticationErrorComponent.IProps> = (props): JSX.Element => {
    const { errorKey, t } = props;
    const isValidErrorKey = useMemo(() => {
        return includes(IAuthenticationErrorComponent.AuthenticationError, errorKey);
    }, [errorKey]);
    return <GenericError>{t(`authentication_error_${isValidErrorKey ? errorKey : "DEFAULT"}`)}</GenericError>;
};

export default withTranslation("common")(AuthenticationError);
