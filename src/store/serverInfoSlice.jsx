import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    serverPublicKey: null
};

const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        setServerPublicKey(state, action) {
            state.serverPublicKey = action.payload;
        },
    }
});

export const selectServerPublicKey = (state) => {
    return state.info.serverPublicKey;
}

export const { setServerPublicKey } = serverSlice.actions;
export default serverSlice.reducer;