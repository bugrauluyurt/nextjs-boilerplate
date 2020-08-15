import { IAppState } from "./app/types";
import { IUserState } from "./user/types";

export interface IStore {
    app: IAppState;
    user: IUserState;
}
