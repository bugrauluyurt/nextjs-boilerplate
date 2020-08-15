import { ROUTES_PROTECTED } from "../constants/routes-protected.constant";

const isProtectedRoute = (pathName: string): boolean => {
    return ROUTES_PROTECTED.some(protectedRoute =>
        pathName.match(new RegExp(`^/${protectedRoute}`, "i"))
    );
};

export default isProtectedRoute;
