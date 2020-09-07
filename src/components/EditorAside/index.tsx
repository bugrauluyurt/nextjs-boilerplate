import * as React from "react";
import IconChevronLeftOutline from "@components/Icons/IconChevronLeftOutline";
import classNames from "classnames";
import { withTranslation } from "../../../i18n";
import { IEditorAsideComponent } from "./editor-aside.interface";
import styles from "./editor-aside.module.scss";
import MenuAlt3Outline from "../Icons/IconMenuAlt3Outline";
import Image from "../Image";

const EditorAside: React.FC<IEditorAsideComponent.IProps> = ({ t, onToggle }): JSX.Element => {
    return (
        <div className={styles.aside}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <Image src="/images/logo-white.svg" alt={t("product-logo")} />
                    <button className={classNames(styles.close, "flex")} onClick={onToggle} type="button">
                        <span>
                            <IconChevronLeftOutline />
                        </span>
                        <span>
                            <MenuAlt3Outline />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withTranslation("common")(EditorAside);
