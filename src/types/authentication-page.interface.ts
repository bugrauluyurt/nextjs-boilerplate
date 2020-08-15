import { WithTranslation } from "next-i18next";

declare namespace IAuthenticationPage {
    export interface IProps extends WithTranslation {
        statusCode?: number;
    }

    export interface InitialProps {
        namespacesRequired: string[];
    }
}

export type { IAuthenticationPage };
