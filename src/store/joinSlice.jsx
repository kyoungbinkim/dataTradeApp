import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    skOwn    : '',
    nickname : '',
    address  : '',
};

const joinSlice = createSlice({
    name: 'join',
    initialState,
    reducers: {
        setSkOwn(state, action) {
            state.skOwn = action.payload;
        },
        setNickname(state, action) {
            state.nickname = action.payload;
        },
        setAddr(state, action) {
            state.address = action.payload;
        },
        clearState(state){
            state.address = '';
            state.nickname= '';
            state.address = '';
        }
    }
});

export const selectSkOwn = (state) => {
    return state.join.skOwn;
}

export const selectNickname = (state) => {
    return state.join.nickname;
}

export const selectAddr = (state) => {
    return state.join.address;
}

export const selectJoinInfo = (state) => {
    return {
        skOwn    : state.join.skOwn,
        nickname : state.join.nickname,
        address  : state.join.address,
    }
}

export const { setSkOwn, setNickname, setAddr, clearState } = joinSlice.actions;
export default joinSlice.reducer;