import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {ILogin} from '../../Components/Login/Login'
import { IToken } from "@/app/types/interfaces";

export const login = createAsyncThunk<IToken, ILogin>(
    '@@login/userLogin',
    async ({username, password}) => {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/signin/`, {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({user: username, password})
        })
        const data = await res.json();
        return data;
    }
)

interface IInitialState {
    token?: IToken;
    status: string;
    error: boolean
}
const initialState:IInitialState = {
    token:{
        accessToken: '',
        refreshToken: '',
    },
    status: 'idle',
    error: false
}

const loginSlice = createSlice({
    name: '@@login',
    initialState,
    reducers:{
        resetTokens: () => {
            return initialState
        },
    },
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
                state.token = action.payload;
            })
    }
})

export const {resetTokens} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;