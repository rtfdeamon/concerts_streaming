import { getTokenForApi } from "@/app/utils/getTokenForApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface IService {
    id: string
    title: string
    description: string
    image_url: string
    email: string
    phone: string
    website: string
    business_name: string
    ein: string
    user: number
}

export const getServices = createAsyncThunk(
    '@@getServices',
    async () => {
        const res = await fetch(`${process.env.BACKEND_URL}/services/`, {
            method: 'GET',
            headers:{
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${await getTokenForApi()}`
            }
        })
        const data: IService[] = await res.json();
        return data;
    }
)

interface IAddServicePayload {
    title: string
    description: string
    image_url: string
}

export const addService = createAsyncThunk<IService, IAddServicePayload>(
    '@@addService',
    async ({title, description, image_url}) => {
        const res = await fetch(`${process.env.BACKEND_URL}/services/`, {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${await getTokenForApi()}`
            },
            body: JSON.stringify({title, description, image_url})
        })
        const data: IService = await res.json();
        return data;
    }
)

interface IInitialState {
    services: IService[]
    error: boolean,
    status: string
}

const initialState: IInitialState = {
    services: [],
    status: 'idle',
    error: false
}

const serviceSlice = createSlice({
    name: '@@user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getServices.rejected, (state) => {
                state.error = true;
                state.status = 'rejected';
            })
            .addCase(getServices.pending, (state) => {
                state.error = false;
                state.status = 'loading';
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.services = action.payload;
                state.error = false;
                state.status = 'loaded';
            })
            .addCase(addService.fulfilled, (state, action) => {
                state.services = [...state.services, action.payload];
                state.error = false;
                state.status = 'loaded';
            })
    }
})

export const serviceReducer = serviceSlice.reducer;