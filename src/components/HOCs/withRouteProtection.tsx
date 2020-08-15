import React, { useContext } from "react";
import { NextPage } from "next";
import { useSelector, shallowEqual } from "react-redux";
import I18nContext from "next-i18next";
import { isEmpty as _isEmpty } from "lodash-es";
import { useRouter } from "next/router";
import { LoggerService } from "@services/logger.service";
import { selectUser } from "../../store/user/selectors";
import { ROUTE_AUTHENTICATION } from "../../constants/routes.constant";

const withRouteProtection = Page => {
    const WrappedPage: NextPage = props => {
        const user = useSelector(selectUser, shallowEqual);
        if (_isEmpty(user)) {
            if (typeof window !== "undefined") {
                LoggerService.log(
                    "[Client][withRouteProtection] User does not exist. Redirecting to /authentication..."
                );
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const router = useRouter();
                // @TODO: Fix pathname error. Translated redirections does not work.
                router.push(`/${ROUTE_AUTHENTICATION}`);
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
                ? "[Server][withRouteProtection] getInitialProps called..."
                : "[Client][withRouteProtection] getInitialProps called..."
        );
        return { ...pageProps };
    };
    return WrappedPage;
};

export default withRouteProtection;
