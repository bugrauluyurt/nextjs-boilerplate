import { WithTranslation } from "next-i18next";

declare namespace ILoginErrorComponent {
    export interface IProps extends WithTranslation {
        errorKey: string;
    }
    export enum LoginError {
        NOT_FOUND = "NOT_FOUND",
    }
}

export default ILoginErrorComponent;
