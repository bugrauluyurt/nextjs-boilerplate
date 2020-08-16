import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { NextPageContext, NextPage } from "next";
import { PageAuthenticationConstant } from "@constants/page-authentication.constant";
import Login from "@components/Login";
import Register from "@components/Register";
import { includes } from "lodash-es";
import { ROUTE_AUTHENTICATION } from "@constants/routes.constant";
import { IAuthenticationPage } from "src/types/authentication-page.interface";
import { isClient } from "@utils/isClient";
import styles from "./authentication.module.scss";
import { withTranslation, Router } from "../../i18n";
import { LoggerService } from "../../src/services/logger.service";

const Auth: NextPage<
    IAuthenticationPage.IProps,
    IAuthenticationPage.InitialProps
> = ({ t, i18n }): JSX.Element => {
    const nextRouter = useRouter();
    // Hooks
    const initialState = includes(
        nextRouter.pathname,
        PageAuthenticationConstant.AUTH_TYPE.REGISTER
    )
        ? PageAuthenticationConstant.AUTH_TYPE.REGISTER
        : PageAuthenticationConstant.AUTH_TYPE.LOGIN;
    const [authenticationState, setAuthenticationState] = useState(
        initialState
    );
    const pushQueryState = async authType => {
        const lang = `${i18n.language === "en" ? "" : i18n.language}`;
        const redirectPath = `/${ROUTE_AUTHENTICATION}?authType=${authType}`;
        LoggerService.log(`[Client] Redirecting to ${lang}${redirectPath}`);
        await Router.push(redirectPath, undefined, { shallow: true });
    };
    // Handles
    const handleOnEmitState = (authType: string) => {
        pushQueryState(authType);
        setAuthenticationState(authType);
    };
    useEffect(() => {
        pushQueryState(initialState);
    }, []);
    // Internal states
    // @TODO Bind these variables to actual values;
    const errorMessage = false;
    const isLogin =
        authenticationState === PageAuthenticationConstant.AUTH_TYPE.LOGIN;
    return (
        <>
            <div className={styles["authentication-component"]}>
                <div className={styles["authentication-component-inner"]}>
                    <div className={styles["authentication-box"]}>
                        <div className="error-wrapper">
                            {errorMessage &&
                                "Error message should be rendered here"}
                        </div>
                        <div className="w-full">
                            {isLogin ? (
                                <Login
                                    onEmitClickRegister={handleOnEmitState}
                                />
                            ) : (
                                <Register
                                    onEmitClickLogin={handleOnEmitState}
                                />
                            )}
                            <p className="text-center text-gray-500 text-xs">
                                &copy;2020 CitrusNotes. All rights reserved.
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
