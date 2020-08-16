import { WithTranslation } from "next-i18next";

declare namespace IAuthenticationErrorComponent {
    export interface IProps extends WithTranslation {
        errorKey: string;
    }
    export enum AuthenticationError {
        DEFAULT = "DEFAULT",
        NOT_FOUND = "NOT_FOUND",
    }
}

export default IAuthenticationErrorComponent;
