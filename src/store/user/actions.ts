import { Action } from "../../types/action.interface";
import { IUser } from "../../types/user.interface";

export enum UserAction {
    SET_USER = "USER::SET_USER",
}

export const UserActions = {
    SetUser: (user: IUser): Action<IUser> => {
        return {
            type: UserAction.SET_USER,
            payload: user,
        };
    },
};
