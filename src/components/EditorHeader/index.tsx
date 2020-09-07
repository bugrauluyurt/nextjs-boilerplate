import React from "react";
import classNames from "classnames";
import IconMenuAlt2Outline from "@components/Icons/IconMenuAlt2Outline";
import { IEditorHeaderComponent } from "./editor-header.interface";
import { withTranslation } from "../../../i18n";
import styles from "./editor-header.module.scss";

const EditorHeader: React.FC<IEditorHeaderComponent.IProps> = ({ t, onToggle, isAsideOpen }): JSX.Element => {
    return (
        <div className={classNames(styles.container, "flex")}>
            <div className={styles.left}>
                {!isAsideOpen && (
                    <button className={styles["menu-toggle"]} type="button" onClick={onToggle}>
                        <IconMenuAlt2Outline />
                    </button>
                )}
                <div className={styles.title}>{t("home")}</div>
            </div>
            <div className={styles.right} />
        </div>
    );
};

export default withTranslation("common")(EditorHeader);
