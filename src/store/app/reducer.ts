import { Action } from "../../types/action.interface";
import { AppAction } from "./actions";
import { IAppState } from "./types";

const INITIAL_STATE: IAppState = {
    version: 1,
};

export const appReducer = (
    state = INITIAL_STATE,
    action: Action<any>
): IAppState => {
    switch (action.type) {
        case AppAction.SET_VERSION:
            return {
                ...state,
                version: action.payload,
            };
        default:
            return state;
    }
};
