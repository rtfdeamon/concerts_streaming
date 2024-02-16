import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    option: string
}
const initialState:IInitialState = {
    option: 'events'
}
const adminMenuSlice = createSlice({
    name: '@@adminMenuSlice',
    initialState,
    reducers:{
        changeMenuOption: (state, action) => {
            state.option = action.payload;
        }
    }
})

export const { changeMenuOption } = adminMenuSlice.actions;
export const adminMenuReducer = adminMenuSlice.reducer;