import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTokenForApi } from "@/app/utils/getTokenForApi";
import { IArtistRequest } from "@/app/types/interfaces";

export const loadSessions = createAsyncThunk<IArtistRequest[], void>(
    '@@sessions/loadSessions',
    async () => {
        const res = await fetch(`${process.env.BACKEND_URL}/sessions/`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${await getTokenForApi()}`,
                'Content-type':'application/json'
            }
        });
        const data = await res.json();
        return data;
    }
)

export interface IChangeSession {
    id: string,
    status: string
}

export const changeSessionStatus = createAsyncThunk<string, IChangeSession>(
    '@@sessions/changeSession',
    async ({id, status}) => {
        const res = await fetch(`${process.env.BACKEND_URL}/sessions/${id}/`, {
            method: 'PATCH',
            headers: {
                'Authorization':`Bearer ${await getTokenForApi()}`,
                'Content-type':'application/json'
            },
            body: JSON.stringify({status})
        });
        return id;
    }
)

interface IInitialState {
    entities: IArtistRequest[],
    status: string,
    error: boolean
}

const initialState: IInitialState = {
    entities: [],
    status: 'idle',
    error: false
}

const sessionsSlice = createSlice({
    name: '@@sessions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSessions.pending, (state) => {
                state.error = false;
                state.status = 'loading';
            })
            .addCase(loadSessions.rejected, (state) => {
                state.error = true;
                state.status = 'rejected';
            })
            .addCase(loadSessions.fulfilled, (state, action) => {
                state.entities = action.payload;
                state.status = 'loaded';
                state.error = false;
            })
            .addCase(changeSessionStatus.fulfilled, (state, action) => {
                state.entities = state.entities.filter(s => s.id !== action.payload)
            })
    }
})

export const sessionsReducer = sessionsSlice.reducer;