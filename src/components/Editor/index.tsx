import React, { useState, useEffect } from "react";
import { useWindowSize } from "@hooks/useWindowSize";
import EditorAside from "@components/EditorAside";
import classNames from "classnames";
import EditorHeader from "@components/EditorHeader";
import EditorBody from "@components/EditorBody";
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

    const onToggleHandle = () => setAsideState(!isAsideOpen);

    return (
        <div
            className={classNames(styles["editor-container"], {
                [styles.open]: isAsideOpen,
            })}
        >
            <div className={styles["editor-aside-container"]}>
                <EditorAside onToggle={onToggleHandle} />
            </div>
            <div className={styles["editor-main-container"]}>
                <EditorHeader onToggle={onToggleHandle} isAsideOpen={isAsideOpen} />
                <EditorBody />
            </div>
        </div>
    );
};

export default withTranslation("common")(Editor);
