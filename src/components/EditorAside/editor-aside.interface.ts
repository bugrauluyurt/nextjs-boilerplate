import { WithTranslation } from "next-i18next";

declare namespace IEditorAsideComponent {
    export interface IProps extends WithTranslation {
        onToggle: () => void;
    }
}

export type { IEditorAsideComponent };
