import { configureStore, combineReducers } from '@reduxjs/toolkit';
import Init from './initSlice'
import Info from './infoSlice'
import Server from './serverInfoSlice'

const reducers = combineReducers({
    init : Init,
    info : Info,
    server : Server,
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