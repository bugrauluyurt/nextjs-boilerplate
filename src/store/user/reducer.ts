import { Action } from "../../types/action.interface";
import { UserAction } from "./actions";
import { IUserState } from "./types";

const INITIAL_STATE: IUserState = {
    data: undefined,
};

export const userReducer = (
    state = INITIAL_STATE,
    action: Action<any>
): IUserState => {
    switch (action.type) {
        case UserAction.SET_USER:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};
