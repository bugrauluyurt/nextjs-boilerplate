import * as React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageAuthenticationConstant } from "@constants/page-authentication.constant";
import { InputStyle } from "../../../styles/components/input";
import { ILoginComponent } from "./login.interface";
import { withTranslation } from "../../../i18n";

const Login: React.FC<ILoginComponent.IProps> = ({
    t,
    onEmitClickRegister,
}): JSX.Element => {
    const dispatch = useDispatch();
    const onClickRegister = e => {
        e.preventDefault();
        onEmitClickRegister(PageAuthenticationConstant.AUTH_TYPE.REGISTER);
    };
    const loading = false;

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(t("invalid_email"))
                .required(t("required")),
            password: Yup.string()
                .min(5, t("min_password"))
                .max(30, t("max_password"))
                .required(t("required")),
        }),
        onSubmit: values => {
            // dispatch(userLogin(values));
        },
    });

    return (
        <>
            <h1 className="text-gray-700 text-base font-bold text-center mb-4">
                {t("login")}
            </h1>
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
            >
                {/* Email Field */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
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
                        <p className="text-red-500 text-sm pt-1 font-bold">
                            {formik.errors.email}
                        </p>
                    ) : null}
                </div>
                {/* Password Field */}
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
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
                        <p className="text-red-500 text-sm pt-1 font-bold">
                            {formik.errors.password}
                        </p>
                    ) : null}
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between">
                    <button
                        className="btn btn-primary-4 ripple"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? `${t("loading")}...` : t("login")}
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
