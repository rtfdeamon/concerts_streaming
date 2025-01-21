import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    value: string
}

const initialState: IInitialState = {
    value: ''
}

const searchInputSlice = createSlice({
    name: '@@searchInput',
    initialState,
    reducers: {
        setDefaultInputState: () => {
            return initialState
        },
        setInputState: (state, action) => {
            state.value = action.payload;
        } 
    }
})

export const {setDefaultInputState, setInputState} = searchInputSlice.actions;
export const searchInputReducer = searchInputSlice.reducer;