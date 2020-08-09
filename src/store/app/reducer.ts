import { Action } from "../../types/action.interface";
import { AppActions } from "./actions";
import { AppState } from "./types";

const INITIAL_STATE: AppState = {
    version: 1,
};

export const appReducer = (
    state = INITIAL_STATE,
    action: Action<any>
): AppState => {
    switch (action.type) {
        case AppActions.SET_VERSION:
            return {
                ...state,
                version: action.payload,
            };
        default:
            return state;
    }
};
