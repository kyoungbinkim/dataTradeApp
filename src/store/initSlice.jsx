import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLogin: false,
    isInitDB : false,
    isInitServer: false,
};

const initSlice = createSlice({
    name: 'init',
    initialState,
    reducers: {
        setLogin(state) {
            state.isLogin = true;
        },
        setLogout(state) {
            state.isLogin = false;
        },

        setInitDB(state) {
            state.isInitDB = true;
        },

        setInitServer(state) {
            state.isInitServer = true;
        }
    }
});

export const { setLogin, setLogout, setInitDB, setInitServer } = initSlice.actions;
export default initSlice.reducer;