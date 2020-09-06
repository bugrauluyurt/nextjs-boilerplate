import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageAuthenticationConstant } from "@constants/page-authentication.constant";
import { useState } from "react";
import UserService from "@services/user.service";
import AuthenticationError from "@components/AuthenticationError";
import { Router } from "i18n";
import { useDispatch } from "react-redux";
import { InputStyle } from "../../../styles/components/input";
import { ILoginComponent } from "./login.interface";
import { withTranslation } from "../../../i18n";
import { LoggerService } from "../../services/logger.service";
import { UserActions } from "../../store/user/actions";
import { IUser } from "../../types/user.interface";

const Login: React.FC<ILoginComponent.IProps> = ({ t, onEmitClickRegister }): JSX.Element => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        error: null,
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email(t("invalid_email")).required(t("required")),
            password: Yup.string().min(5, t("min_password")).max(30, t("max_password")).required(t("required")),
        }),
        onSubmit: values => {
            setState({ ...state, loading: true, error: null });
            UserService.loginUser(values)
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

    const onClickRegister = e => {
        e.preventDefault();
        onEmitClickRegister(PageAuthenticationConstant.AUTH_TYPE.REGISTER);
    };

    return (
        <>
            <h1 className="text-lg text-gray-700 font-bold text-center mb-6">{t("login")}</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                {/* Error */}
                {state?.error && <AuthenticationError errorKey={state?.error?.key} />}
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
                    <button className="btn btn-primary-1 ripple" type="submit" disabled={state?.loading}>
                        {state?.loading ? `${t("loading")}...` : t("login")}
                    </button>
                    <button
                        type="button"
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer underline"
                        onClick={onClickRegister}
                    >
                        <span className="pr-1">{t("register")}</span>
                    </button>
                </div>
            </form>
        </>
    );
};

export default withTranslation("common")(Login);
