import React from "react";
import dynamic from "next/dynamic";
import { isClient } from "@utils/isClient";
import { LoggerService } from "@services/logger.service";
import { compose } from "redux";
import withRouteProtection from "@components/HOCs/withRouteProtection";
import { withTranslation, Router } from "../../i18n";

const EditorComponentWithNoSSR = dynamic(() => import("../../src/components/Editor"), { ssr: false });

const Editor = ({ t, i18n }): JSX.Element => {
    return <EditorComponentWithNoSSR />;
};

Editor.getInitialProps = async () => {
    // eslint-disable-next-line prettier/prettier
    LoggerService.log(`${isClient() ? "[Client]": "[Server]"} [Editor] getInitialProps called...`);
    return {
        namespacesRequired: ["common"],
    };
};

export default compose(withRouteProtection, withTranslation("common"))(Editor);
