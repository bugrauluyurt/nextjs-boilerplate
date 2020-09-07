import { WithTranslation } from "next-i18next";

declare namespace IEditorHeaderComponent {
    export interface IProps extends WithTranslation {
        onToggle: () => void;
        isAsideOpen: boolean;
    }
}

export type { IEditorHeaderComponent };
