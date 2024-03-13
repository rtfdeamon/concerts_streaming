import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTokenForApi } from "@/app/utils/getTokenForApi";
import { IAd } from "@/app/types/interfaces";

export const loadAds = createAsyncThunk<IAd[], void>(
    '@@ads/loadAds',
    async () => {
        const res = await fetch(`${process.env.BACKEND_URL}/sponsor-ads/?status=pending&select=all`, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${await getTokenForApi()}`
            }
        })
        const data: IAd[] = await res.json();
        return data as IAd[];
    }
)

export interface IChangeAd {
    id: string,
    status: string
}

export const resAd = createAsyncThunk<string, IChangeAd>(
    '@@ads/acceptAd',
    async ({id, status}) => {
        await fetch(`${process.env.BACKEND_URL}/sponsor-ads/${id}/`, {
          method : 'PATCH',
          headers: {
            'Authorization' : `Bearer ${await getTokenForApi()}`,
            'Content-type' : 'application/json'
          },
          body: JSON.stringify({status})
        })
        return id;
    }
)

interface IInitialState {
    entities: IAd[],
    status: string,
    error: boolean
}

const initialState: IInitialState = {
    entities: [],
    status: 'idle',
    error: false
}
const adsSlice = createSlice({
    name: '@@ads',
    initialState,
    reducers: {
        setDefaultState: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAds.pending, (state) => {
                state.error = false;
                state.status = 'loading'
            })
            .addCase(loadAds.rejected, (state) => {
                state.error = true;
                state.status = 'rejected';
            })
            .addCase(loadAds.fulfilled, (state, action) => {
                state.error = false;
                state.status = 'loaded';
                state.entities = action.payload;
            })
            .addCase(resAd.fulfilled, (state, action) => {
                state.entities = state.entities.filter(s => s.id !== action.payload)
            })
    }
})

export const { setDefaultState } = adsSlice.actions;
export const adsReducer = adsSlice.reducer;