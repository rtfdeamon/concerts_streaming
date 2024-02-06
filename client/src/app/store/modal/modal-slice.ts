import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
    isOpen: false
}

const modalSlice = createSlice({
    name: '@@modal',
    initialState,
    reducers:{
        setOpen: (state, action:PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
})

export const { setOpen } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;