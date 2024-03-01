import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTokenForApi } from "@/app/utils/getTokenForApi";
import { IEvent } from "@/app/types/interfaces";
import { IShow } from "@/app/types/interfaces";
import { IChangeShow } from "@/app/types/interfaces";

interface IInitialState {
    events: IEvent[],
    status: string,
    error: boolean
}

const initialState: IInitialState = {
    events: [],
    status: 'idle',
    error: false
}

export const loadAllShows = createAsyncThunk<IEvent[], void>(
    '@@shows',
    async () => {
        const res = await fetch(`${process.env.BACKEND_URL}/concerts/`);
        const data = await res.json();
        return data as IEvent[];
    }
)

export const createShow = createAsyncThunk<IEvent, IShow>(
    '@@shows/createShow',
    async ({name, description, date, slots, performance_time, poster_url, category, access, ticket_price}) => {
        const res = await fetch(`${process.env.BACKEND_URL}/concerts/`, {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${await getTokenForApi()}`
            },
            body: JSON.stringify({name, description, date, slots, performance_time, poster_url, category, access, ticket_price})
        })
        const data = await res.json();
        return data as IEvent
    }
)

export const deleteShow = createAsyncThunk<string, string>(
    '@@shows/deleteShow',
    async (id) => {
            await fetch(`${process.env.BACKEND_URL}/concerts/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${await getTokenForApi()}`
            }
        })
        return id
    }
)

export const changeShow = createAsyncThunk<IEvent, IChangeShow>(
    '@@shows/changeShow',
    async ({id, name, description, date, slots, performance_time, poster_url, category, access, ticket_price}) => {
            const res = await fetch(`${process.env.BACKEND_URL}/concerts/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${await getTokenForApi()}`
            },
            body: JSON.stringify({name, description, date, slots, performance_time, poster_url, category, access, ticket_price})
        })
        const data = await res.json();
        return data as IEvent;
    }
)

interface IDate {
    from: string,
    to: string
}

export const getShowByFilter = createAsyncThunk<IEvent[], IDate>(
    '@@shows/getShowByFilter',
    async ({from, to}) => {
        const res = await fetch(`${process.env.BACKEND_URL}/concerts/?from=${from}&to=${to}/`)
        const data = await res.json()
        return data as IEvent[];
    }
)

export const eventsSort = createAsyncThunk<IEvent[], {sort: string}>(
    '@@shows/eventsSortByDate',
    async ({sort}) => {
        const res = await fetch(`${process.env.BACKEND_URL}/concerts/?sort=${sort}/`)
        const data = await res.json()
        return data as IEvent[];
    }
)

export const showsSlice = createSlice({
    name: '@@shows',
    initialState,
    reducers:{
        setDefaultState: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllShows.rejected, (state) => {
                state.error = true;
                state.status = 'rejected';
            })
            .addCase(loadAllShows.pending, (state) => {
                state.error = false;
                state.status = 'loading';
            })
            .addCase(loadAllShows.fulfilled, (state, action) => {
                state.error = false;
                state.status = 'loaded';
                state.events = action.payload
            })
            .addCase(createShow.fulfilled, (state, action) => {
                state.events.push(action.payload)
            })
            .addCase(deleteShow.fulfilled, (state, action) => {
                const filteredEvents = state.events.filter(e => e.id !== action.payload)
                state.events = filteredEvents;
            })
            .addCase(changeShow.fulfilled, (state, action) => {
                const changedShowIndex = state.events.findIndex(e => e.id === action.payload.id)
                state.events[changedShowIndex] = action.payload;
            })
            .addCase(getShowByFilter.fulfilled, (state, action) => {
                state.events = action.payload;
            })
            .addCase(eventsSort.fulfilled, (state, action) => {
                state.events = action.payload;
            })
    }
})

export const { setDefaultState } = showsSlice.actions;
export const showsReducer = showsSlice.reducer;
