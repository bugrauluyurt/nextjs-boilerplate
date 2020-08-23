import React, { useMemo } from "react";
import { values } from "lodash-es";
import { withTranslation } from "../../i18n";
import { useSocket } from "../../src/hooks/useSocket";
import { SOCKET_NS_DEFAULT, SOCKET_NS_DEFAULT_EVENTS } from "../../src/constants/socket/ns-default.constant";

const Company = ({ t }): JSX.Element => {
    const eventSubscriptions = useMemo(() => {
        return values(SOCKET_NS_DEFAULT_EVENTS.SERVER);
    }, []);
    const socket = useSocket(SOCKET_NS_DEFAULT, eventSubscriptions);
    const emitHandler = () => {
        socket.emit(SOCKET_NS_DEFAULT_EVENTS.CLIENT.FIRST_MESSAGE, ["Hello socket.io!"]);
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
