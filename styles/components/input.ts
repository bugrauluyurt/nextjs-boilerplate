import classNames from "classnames";
import { FormikValues } from "formik";

export const InputStyle = (formik?: FormikValues) => {
    const classNamesArr = [
        "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
    ] as any;
    if (formik) {
        classNamesArr.push({
            "border-red-500": formik.touched.password && formik.errors.password,
        });
    }
    return classNames(...classNamesArr);
};
