import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLogin: false,
    isInitDB : false,
    isInitServer: false,
    usrIdx : undefined
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
        },
        setUsrIdx(state, action) {
            state.usrIdx = action.payload;
        }
    }
});

export const selectUsrIdx = (state) => {
    return state.init.usrIdx;
}

export const { setLogin, setLogout, setInitDB, setInitServer, setUsrIdx } = initSlice.actions;
export default initSlice.reducer;