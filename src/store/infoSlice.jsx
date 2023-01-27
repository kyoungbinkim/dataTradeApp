import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    skOwn    : null,
    data     : [],
};

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setSkOwn(state, action) {
            state.skOwn = action.payload;
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

export const selectInfo = (state) => {
    return {
        skOwn    : state.info.skOwn,
        data     : state.info.data
    }
}

export const { setSkOwn, setData } = infoSlice.actions;
export default infoSlice.reducer;