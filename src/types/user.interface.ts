import { UserRole } from "@enums/user-role.enum";

export interface IUser {
    _id: string;
    companies: string[];
    companyRoles: string[];
    roles: UserRole[];
    name: string;
    email: string;
    phone: string;
    address: string;
}
