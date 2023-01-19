import { configureStore, combineReducers } from '@reduxjs/toolkit';
import Init from './initSlice'

const reducers = combineReducers({
    init : Init,
});

export default function initStore() {
    const store = configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }),
    });
    return store;
}