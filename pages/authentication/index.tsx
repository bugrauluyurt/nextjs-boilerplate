import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPageContext, NextPage } from "next";
import { PageAuthenticationConstant } from "@constants/page-authentication.constant";
import Login from "@components/Login";
import Register from "@components/Register";
import { includes, isEmpty } from "lodash-es";
import { ROUTE_AUTHENTICATION } from "@constants/routes.constant";
import { IAuthenticationPage } from "src/types/authentication-page.interface";
import { isClient } from "@utils/isClient";
import { useSelector } from "react-redux";
import Locale from "@enums/locale.enum";
import styles from "./authentication.module.scss";
import { withTranslation, Router } from "../../i18n";
import { LoggerService } from "../../src/services/logger.service";
import { selectIsAnonymous } from "../../src/store/user/selectors";

const Auth: NextPage<IAuthenticationPage.IProps, IAuthenticationPage.InitialProps> = ({ t, i18n }): JSX.Element => {
    const nextRouter = useRouter();
    const isAnonymous = useSelector(selectIsAnonymous);
    const initialState = includes(nextRouter.pathname, PageAuthenticationConstant.AUTH_TYPE.REGISTER)
        ? PageAuthenticationConstant.AUTH_TYPE.REGISTER
        : PageAuthenticationConstant.AUTH_TYPE.LOGIN;
    const [authenticationState, setAuthenticationState] = useState(initialState);
    const isLogin = authenticationState === PageAuthenticationConstant.AUTH_TYPE.LOGIN;
    // Methods
    const pushQueryState = async authType => {
        const lang = `${i18n.language === Locale.EN ? "" : i18n.language}`;
        const redirectPath = `/${ROUTE_AUTHENTICATION}?authType=${authType}`;
        LoggerService.log(`[Client] Redirecting to ${lang}${redirectPath}`);
        await Router.push(redirectPath, undefined, { shallow: true });
    };
    const handleOnEmitState = (authType: string) => {
        pushQueryState(authType);
        setAuthenticationState(authType);
    };
    // Lifecycle
    useEffect(() => {
        // If anonymous, then component should set the default query param (login/register)
        if (isAnonymous) {
            pushQueryState(initialState);
        }
    }, []);
    // Render
    if (!isAnonymous) {
        if (isClient()) {
            LoggerService.log("[Client] [Authentication] User exists. Redirecting to /...");
            Router.push("/");
        }
        return <div>{t("redirecting")}</div>;
    }
    return (
        <>
            <div className={styles["authentication-component"]}>
                <div className={styles["authentication-component-inner"]}>
                    <div className={styles["authentication-box"]}>
                        <div className="w-full">
                            {isLogin ? (
                                <Login onEmitClickRegister={handleOnEmitState} />
                            ) : (
                                <Register onEmitClickLogin={handleOnEmitState} />
                            )}
                            <p className="text-center text-gray-500 text-xs">
                                &copy;2020 CitrusNotes. {t("all-rights-reserved")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Auth.getInitialProps = async (ctx: NextPageContext) => {
    return {
        namespacesRequired: ["common"],
    };
};

export default withTranslation("common")(Auth);
