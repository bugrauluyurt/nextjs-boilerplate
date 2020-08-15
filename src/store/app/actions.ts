import { Action } from "../../types/action.interface";

export enum AppAction {
    SET_VERSION = "APP::SET_VERSION",
}

export const AppActions = {
    SetVersion: (version: number): Action<number> => ({
        type: AppAction.SET_VERSION,
        payload: version,
    }),
};
