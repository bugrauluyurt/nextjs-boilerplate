import * as React from "react";
import { PageAuthenticationConstant } from "@constants/page-authentication.constant";
import { useFormik } from "formik";
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

const Register: React.FC<IRegisterComponent.IProps> = ({ t, onEmitClickLogin }): JSX.Element => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        error: null,
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().min(3, t("min_username")).max(100, t("max_username")).required(t("required")),
            email: Yup.string().email(t("invalid_email")).required(t("required")),
            password: Yup.string().min(5, t("min_password")).max(30, t("max_password")).required(t("required")),
        }),
        onSubmit: values => {
            setState({ ...state, loading: true, error: null });
            UserService.registerUser(values)
                .then((user: IUser) => {
                    setState({ ...state, loading: false });
                    dispatch(UserActions.SetUser(user));
                    Router.push("/");
                })
                .catch(error => {
                    setState({ ...state, error });
                    LoggerService.log(error, "error");
                });
        },
    });

    const onClickLogin = (e: Event): void => {
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        {t("username")}
                    </label>
                    <input
                        className={InputStyle(formik)}
                        id="username"
                        type="text"
                        placeholder={t("username")}
                        {...formik.getFieldProps("username")}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <p className="text-red-500 text-sm pt-1">{formik.errors.username}</p>
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
                        <p className="text-red-500 text-sm pt-1">{formik.errors.email}</p>
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
                        <p className="text-red-500 text-sm pt-1">{formik.errors.password}</p>
                    ) : null}
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between">
                    <button className="btn btn-primary-4 ripple" type="submit">
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
