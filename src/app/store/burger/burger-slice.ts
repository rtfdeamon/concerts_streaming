import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
    isOpen: false
}

const burgerSlice = createSlice({
    name: '@@burger',
    initialState,
    reducers:{
        setOpen: (state, action:PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
})

export const { setOpen } = burgerSlice.actions;
export const burgerReducer = burgerSlice.reducer;