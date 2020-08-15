import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { NextPageContext, NextPage } from "next";
import { PageAuthenticationConstant } from "@constants/page-authentication.constant";
import Login from "@components/Login";
import Register from "@components/Register";
import { includes } from "lodash-es";
import { ROUTE_AUTHENTICATION } from "@constants/routes.constant";
import { IAuthenticationPage } from "src/types/authentication-page.interface";
import styles from "./authentication.module.scss";
import { withTranslation } from "../../i18n";

const Auth: NextPage<
    IAuthenticationPage.IProps,
    IAuthenticationPage.InitialProps
> = ({ t }): JSX.Element => {
    // Hooks
    const router = useRouter();
    const initialState = includes(
        router.pathname,
        PageAuthenticationConstant.AUTH_TYPE.REGISTER
    )
        ? PageAuthenticationConstant.AUTH_TYPE.REGISTER
        : PageAuthenticationConstant.AUTH_TYPE.LOGIN;
    const [authenticationState, setAuthenticationState] = useState(
        initialState
    );
    const pushQueryState = async authType => {
        // @TODO: Fix pathname error. Translated redirections does not work.
        await router.push(
            `${router.pathname}?authType=${authType}`,
            undefined,
            { shallow: true }
        );
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

Auth.getInitialProps = async ({
    pathname,
    asPath,
    res,
    query,
}: NextPageContext) => {
    return {
        namespacesRequired: ["common"],
    };
};

export default withTranslation("common")(Auth);
