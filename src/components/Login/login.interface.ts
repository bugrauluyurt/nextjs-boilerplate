import { WithTranslation } from "next-i18next";

declare namespace ILoginComponent {
    export interface IProps extends WithTranslation {
        statusCode?: number;
        onEmitClickRegister?: (authenticationState: string) => void;
    }
}

export type { ILoginComponent };
