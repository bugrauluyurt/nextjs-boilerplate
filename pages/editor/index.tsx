import React from "react";
import { compose } from "redux";
import { isClient } from "@utils/isClient";
import EditorAside from "@components/EditorAside";
import styles from "./editor.module.scss";
import { withTranslation } from "../../i18n";
import withRouteProtection from "../../src/components/HOCs/withRouteProtection";
import { LoggerService } from "../../src/services/logger.service";

const Editor = ({ t }): JSX.Element => {
    return (
        <div className={styles["editor-container"]}>
            <div className={styles["editor-aside-container"]}>
                <EditorAside />
            </div>
            <div className={styles["editor-main-container"]}>[Editor-Main-Container]</div>
        </div>
    );
};

Editor.getInitialProps = async () => {
    // eslint-disable-next-line prettier/prettier
    LoggerService.log(`${isClient() ? "[Client]": "[Server]"} [Editor] getInitialProps called...`);
    return {
        namespacesRequired: ["common"],
    };
};

export default compose(withRouteProtection, withTranslation("common"))(Editor);
