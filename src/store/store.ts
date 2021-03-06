import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import promise from "redux-promise-middleware";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import combineReducers from "./rootReducer";

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== "production") {
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        // Write state preservation here if required
        // if (state.version) nextState.version = state.version; // preserve count value on client side navigation
        return nextState;
    }
    return combineReducers(state, action);
};

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware, promise]));
};
const wrapper = createWrapper(initStore, {
    debug: false,
});
export default wrapper;
