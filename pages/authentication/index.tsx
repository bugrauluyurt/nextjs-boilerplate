import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { PageAuthenticationConstant } from "@constants/page-authentication.constant";
import Login from "@components/Login";
import Register from "@components/Register";
import { includes } from "lodash-es";
import styles from "./authentication.module.scss";
import { withTranslation } from "../../i18n";
import { ROUTE_AUTHENTICATION } from "@constants/routes.constant";

const Auth = ({ t }): JSX.Element => {
    // Hooks
    const router = useRouter();
    const initialState = includes(router.pathname, PageAuthenticationConstant.AUTH_TYPE.REGISTER)
        ? PageAuthenticationConstant.AUTH_TYPE.REGISTER
        : PageAuthenticationConstant.AUTH_TYPE.LOGIN
    const [authenticationState, setAuthenticationState] = useState(initialState);
    const pushQueryState = async (state) => await router.push(
        `/${ROUTE_AUTHENTICATION}/?authType=${state}`,
        undefined,
        {shallow: true}
    );
    // Handles
    const handleOnEmitState = useMemo(() => {
        return (state) => {
            pushQueryState(state);
            setAuthenticationState(state);
        }
    }, [authenticationState]);
    useEffect(() => {
        pushQueryState(initialState);
    }, []);
    // Internal states
    // @TODO Bind these variables to actual values;
    const errorMessage = false;
    const isLogin = authenticationState === PageAuthenticationConstant.AUTH_TYPE.LOGIN;

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
                            {isLogin ? <Login onEmitClickRegister={handleOnEmitState}/> : <Register onEmitClickLogin={handleOnEmitState}/>}
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
    // @TODO: If authenticated, redirect to home page.
    // const correctSlug = some(
    //     Object.values(PageAuthenticationConstant.SLUGS),
    //     authType => authType === query.authType
    // );
    // const slug = correctSlug
    //     ? query.authType
    //     : PageAuthenticationConstant.SLUGS.REGISTER;
    // if (res && !correctSlug) {
    //     res.writeHead(301, {
    //         Location: replace(
    //             pathname,
    //             PageAuthenticationConstant.SLUG_NAME,
    //             slug as string
    //         ),
    //     });
    //     res.end();
    // }
    return {
        namespacesRequired: ["common"],
    };
};

export default withTranslation("common")(Auth);
