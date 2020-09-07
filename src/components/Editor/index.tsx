import React, { useState, useEffect } from "react";
import { useWindowSize } from "@hooks/useWindowSize";
import EditorAside from "@components/EditorAside";
import classNames from "classnames";
import { withTranslation } from "../../../i18n";
import styles from "./editor.module.scss";

const Editor = ({ t }): JSX.Element => {
    const useWindowSizeResult = useWindowSize(true);
    const [isAsideOpen, setAsideState] = useState(useWindowSizeResult.current.isTabletLandscapeUp);
    const isCurrentTableLandscapeUp = useWindowSizeResult.current.isTabletLandscapeUp;

    useEffect(() => {
        if (
            !useWindowSizeResult.current.isTabletLandscapeUp &&
            useWindowSizeResult.previous.isTabletLandscapeUp &&
            isAsideOpen
        ) {
            setAsideState(false);
        }
        if (
            !useWindowSizeResult.previous.isTabletLandscapeUp &&
            useWindowSizeResult.current.isTabletLandscapeUp &&
            !isAsideOpen
        ) {
            setAsideState(true);
        }
    }, [isCurrentTableLandscapeUp]);

    return (
        <div
            className={classNames(styles["editor-container"], {
                [styles.open]: isAsideOpen,
            })}
        >
            <div className={styles["editor-aside-container"]}>
                <EditorAside onToggle={() => setAsideState(!isAsideOpen)} />
            </div>
            <div className={styles["editor-main-container"]}>[Editor-Main-Container]</div>
        </div>
    );
};

export default withTranslation("common")(Editor);
