import * as React from "react";
import { withTranslation } from "../../../i18n";
import { IEditorAsideComponent } from "./editor-aside.interface";

const EditorAside: React.FC<IEditorAsideComponent.IProps> = ({ t }): JSX.Element => {
    return <div>[Editor-Aside]</div>;
};

export default withTranslation("common")(EditorAside);
