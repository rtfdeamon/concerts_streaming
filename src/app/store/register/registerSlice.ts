import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IRegister } from "@/app/Components/SignUp/SignUp";

export const signUp = createAsyncThunk<IRegister, any>(
    '@@register/userSignUp',
    async ({email, username, password}) => {
        const res = await fetch(`${process.env.BACKEND_URL}/`, {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({email, username, password})
        })
        const data = await res.json();
        return data;
    }
)

interface IInitialState {
    state: any;
    status: string;
    error: boolean
}
const initialState:IInitialState = {
    state: [],
    status: 'idle',
    error: false
}

const registerSlice = createSlice({
    name: '@@register',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.rejected, (state) => {
                state.status = 'rejected';
                state.error = true;
            })
            .addCase(signUp.pending, (state) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.error = false;
                state.state = action.payload;
            })
    }
})

export const registerReducer = registerSlice.reducer;