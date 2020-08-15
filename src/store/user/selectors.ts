import { IUser } from "../../types/user.interface";
import { IStore } from "../store.interface";

export const selectUser = (state: IStore): IUser => state?.user?.data;
