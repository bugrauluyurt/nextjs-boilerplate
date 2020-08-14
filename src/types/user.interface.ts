import { UserRole } from "@enums/user-role.enum";

export interface User {
    _id: string;
    companies: string[];
    roles: UserRole[];
    name: string;
    email: string;
    phone: string;
    address: string;
}
