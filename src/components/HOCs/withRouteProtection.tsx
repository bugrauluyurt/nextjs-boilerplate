import React from "react";
import { NextPage } from "next";
import { useSelector, shallowEqual } from "react-redux";
import { isEmpty as _isEmpty } from "lodash-es";
import { LoggerService } from "@services/logger.service";
import { isClient } from "@utils/isClient";
import { Router } from "i18n";
import { PageAuthenticationConstant } from "@constants/page-authentication.constant";
import { selectUser } from "../../store/user/selectors";
import { ROUTE_AUTHENTICATION } from "../../constants/routes.constant";

const withRouteProtection = Page => {
    const WrappedPage: NextPage = props => {
        const user = useSelector(selectUser, shallowEqual);
        if (_isEmpty(user)) {
            if (isClient()) {
                LoggerService.log(
                    "[Client][withRouteProtection] User does not exist. Redirecting to /authentication..."
                );
                Router.push(
                    `/${ROUTE_AUTHENTICATION}?authType=${PageAuthenticationConstant.AUTH_TYPE.LOGIN}`
                );
            }
            return <div>Redirecting please wait...</div>;
        }
        return <Page {...props} />;
    };
    WrappedPage.getInitialProps = async ctx => {
        const pageProps = Page.getInitialProps
            ? await Page.getInitialProps(ctx)
            : {};
        LoggerService.log(
            ctx.req
                ? "[Server] [withRouteProtection] getInitialProps called..."
                : "[Client] [withRouteProtection] getInitialProps called..."
        );
        return { ...pageProps };
    };
    return WrappedPage;
};

export default withRouteProtection;
