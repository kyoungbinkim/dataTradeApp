import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLogin: false,
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
        }
    }
});

export const { setLogin, setLogout } = initSlice.actions;
export default initSlice.reducer;