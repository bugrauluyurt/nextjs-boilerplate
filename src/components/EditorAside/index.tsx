import * as React from "react";
import { withTranslation } from "../../../i18n";
import { IEditorAsideComponent } from "./editor-aside.interface";
import styles from "./editor-aside.module.scss";
import MenuAlt3 from "../Icons/IconMenuAlt3";

const EditorAside: React.FC<IEditorAsideComponent.IProps> = ({ t, onToggle }): JSX.Element => {
    return (
        <div className={styles["editor-aside"]}>
            <div className={styles["editor-aside-inner"]}>
                <div className="px-2 relative">
                    <div>[Logo]</div>
                    <button className={styles["editor-aside-close"]} onClick={onToggle} type="button">
                        <MenuAlt3 />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withTranslation("common")(EditorAside);
