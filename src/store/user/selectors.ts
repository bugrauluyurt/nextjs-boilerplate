import { get } from "lodash-es";
import { IUser } from "../../types/user.interface";
import { IStore } from "../store.interface";

export const selectUser = (state: IStore): IUser => state?.user?.data;
export const selectIsAnonymous = (state: IStore): boolean => !get(state, "user.data.email");
