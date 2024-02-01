import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {ILogin} from '../../Components/Login/Login'

export const login = createAsyncThunk<ILogin, any>(
    '@@login/userLogin',
    async ({username, password}) => {
        const res = await fetch(`${process.env.BACKEND_URL}/`, {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({username, password})
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

const loginSlice = createSlice({
    name: '@@login',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(login.rejected, (state) => {
                state.status = 'rejected';
                state.error = true;
            })
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.error = false;
                state.state = action.payload;
            })
    }
})

export const loginReducer = loginSlice.reducer;