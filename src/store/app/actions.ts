import { Action } from "../../types/action.interface";

export enum AppActions {
    SET_VERSION = "APP::SET_VERSION",
}

export const setVersion = (version: number): Action<number> => ({
    type: AppActions.SET_VERSION,
    payload: version,
});
