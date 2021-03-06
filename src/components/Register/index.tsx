import * as React from "react";
import { PageAuthenticationConstant } from "@constants/page-authentication.constant";
import { useFormik } from "formik";
import { get } from "lodash-es";
import * as Yup from "yup";
import { useState } from "react";
import UserService from "@services/user.service";
import { LoggerService } from "@services/logger.service";
import { useDispatch } from "react-redux";
import AuthenticationError from "@components/AuthenticationError";
import { IRegisterComponent } from "./register.interface";
import { withTranslation, Router } from "../../../i18n";
import { InputStyle } from "../../../styles/components/input";
import { UserActions } from "../../store/user/actions";
import { IUser } from "../../types/user.interface";
import { ROUTE_EDITOR } from '@constants/routes.constant';

const Register: React.FC<IRegisterComponent.IProps> = ({ t, onEmitClickLogin }): JSX.Element => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        error: null,
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, t("min_username")).max(100, t("max_username")).required(t("required")),
            email: Yup.string().email(t("invalid_email")).required(t("required")),
            password: Yup.string().min(5, t("min_password")).max(30, t("max_password")).required(t("required")),
        }),
        onSubmit: values => {
            setState({ ...state, loading: true, error: null });
            UserService.registerUser(values)
                .then(response => {
                    const user: IUser = response?._id ? response : get(response, "data");
                    if (!user) {
                        throw new Error("User does not exist on response");
                    }
                    setState({ ...state, loading: false });
                    dispatch(UserActions.SetUser(user));
                    Router.push(`/${ROUTE_EDITOR}`);
                })
                .catch(error => {
                    setState({ ...state, error });
                    LoggerService.log(error, "error");
                });
        },
    });

    const onClickLogin = e => {
        e.preventDefault();
        onEmitClickLogin(PageAuthenticationConstant.AUTH_TYPE.LOGIN);
    };

    return (
        <>
            <h1 className="text-gray-700 text-lg font-bold text-center mb-6">{t("register")}</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                {/* Error */}
                {state?.error && <AuthenticationError errorKey={state?.error?.key} />}
                {/* Name Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        {t("username")}
                    </label>
                    <input
                        className={InputStyle(formik)}
                        id="name"
                        type="text"
                        placeholder={t("username")}
                        autoComplete="off"
                        {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <p className="text-red-500 text-sm pt-1 font-bold">{formik.errors.name}</p>
                    ) : null}
                </div>
                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        {t("email")}
                    </label>
                    <input
                        className={InputStyle(formik)}
                        id="email"
                        type="text"
                        placeholder={t("email")}
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500 text-sm pt-1 font-bold">{formik.errors.email}</p>
                    ) : null}
                </div>
                {/* Password Field */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        {t("password")}
                    </label>
                    <input
                        className={InputStyle(formik)}
                        id="password"
                        type="password"
                        placeholder="***************"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <p className="text-red-500 text-sm pt-1 font-bold">{formik.errors.password}</p>
                    ) : null}
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between">
                    <button className="btn btn-primary-1 ripple" type="submit">
                        {state.loading ? `${t("loading")}...` : t("register")}
                    </button>
                    <button
                        type="button"
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer underline"
                        onClick={onClickLogin}
                    >
                        <span className="pr-1">{t("login")}</span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default withTranslation("common")(Register);
