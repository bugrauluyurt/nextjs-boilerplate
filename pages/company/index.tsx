import React, { useEffect, useState } from "react";
import { withTranslation } from "../../i18n";
import { useSocket } from "../../src/hooks/useSocket";
import { isClient } from "../../src/utils/isClient";

const Company = ({ t }): JSX.Element => {
    const socket = useSocket("socket-message-ns");
    if (isClient()) {
        console.log("Connected", socket.connected);
        console.log("Emitting", socket.emitting);
        console.log("Last emitted at", socket.lastEmittedAt);
    }
    const emitHandler = () => {
        socket.emit("client.event.message", ["Hello socket.io!"]);
    };
    return (
        <>
            <button type="button" onClick={emitHandler}>
                Emit event
            </button>
            <div>[Company-Page]</div>
        </>
    );
};

Company.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

export default withTranslation("common")(Company);
