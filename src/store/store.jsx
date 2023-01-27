import { configureStore, combineReducers } from '@reduxjs/toolkit';
import Init from './initSlice'
import Join from './joinSlice'
import Info from './infoSlice'

const reducers = combineReducers({
    init : Init,
    join : Join,
    info : Info,
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