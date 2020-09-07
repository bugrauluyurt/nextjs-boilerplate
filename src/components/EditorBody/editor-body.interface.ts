import { WithTranslation } from "next-i18next";

declare namespace IEditorBodyComponent {
    export interface IProps extends WithTranslation {
        firstProp?: any;
    }
}

export type { IEditorBodyComponent };
