import { WithTranslation } from "next-i18next";

declare namespace ILoginComponent {
    export interface IProps extends WithTranslation {
        onEmitClickRegister?: (authenticationState: string) => void;
    }
}

export type { ILoginComponent };
