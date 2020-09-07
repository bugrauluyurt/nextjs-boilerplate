import React from "react";
import { IEditorBodyComponent } from "./editor-body.interface";
import { withTranslation } from "../../../i18n";
import styles from "./editor-body.module.scss";

const EditorBody: React.FC<IEditorBodyComponent.IProps> = ({ t }): JSX.Element => {
    return <div className={styles.container}>[Editor-Body]</div>;
};

export default withTranslation("common")(EditorBody);
