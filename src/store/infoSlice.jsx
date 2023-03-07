import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    key      : null,
    publicKey: null,
    skOwn    : null,
    skEnc    : null,
    pkEnc    : null,
    pkOwn    : null,
    data     : [],
};

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setKey(state, action) {
            state.key = action.payload;
        },
        setPublicKey(state, action ){
            state.publicKey = action.payload;
        },
        setSkOwn(state, action) {
            state.skOwn = action.payload;
        },
        setSkEnc(state, action) {
            state.skEnc = action.payload;
        },
        setPkOwn(state, action) {
            state.pkOwn = action.payload;
        },
        setPkEnc(state, action) {
            state.pkEnc = action.payload;
        },
        setData(state, action){
            state.data = action.payload
        }
    }
});

export const selectSkOwn = (state) => {
    return state.info.skOwn;
}

export const selectData = (state) => {
    return state.info.data;
}

export const selectKey = (state) => {
    return state.info.key;
}

export const selectPublicKey = (state) => {
    return state.info.publicKey;
}

export const selectInfo = (state) => {
    return {
        skOwn    : state.info.skOwn,
        data     : state.info.data
    }
}

export const { setKey, setPublicKey, setSkOwn, setSkEnc, setPkOwn, setPkEnc, setData } = infoSlice.actions;
export default infoSlice.reducer;