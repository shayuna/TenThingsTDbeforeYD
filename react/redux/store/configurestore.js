import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import itemsReducer from "../reducers/items";

export default function configureStore(initialState) {
    return createStore(
        combineReducers({
            items: itemsReducer,
          }),
          initialState,
        applyMiddleware(thunk)
    );
}

