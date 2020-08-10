import { WithTranslation } from "next-i18next";

declare namespace IRegisterComponent {
    export interface IProps extends WithTranslation {
        onEmitClickLogin: (authenticationState: string) => void;
    }
}

export type { IRegisterComponent };
