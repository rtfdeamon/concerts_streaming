import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTokenForApi } from "@/app/utils/getTokenForApi";
import { IArtist, IUser } from "@/app/types/interfaces";
import { ILink } from "@/app/utils/generateUploadLink";



export const getCurrUser = createAsyncThunk<IUser, void>(
    '@@user/getCurrUser',
    async () => {
        const res = await fetch(`${process.env.BACKEND_URL}/users/current/`, {
            headers:{
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${await getTokenForApi()}`
            }
        })
        const data = await res.json();
        return data as IUser;
    }
)

// export const changeCurrUserName = createAsyncThunk<IUser, string>(
//     '@@user/changeCurrUserName',
//     async (name) => {
//         const res = await fetch(`${process.env.BACKEND_URL}/users/current/`, {
//             method: 'PUT',
//             headers:{
//                 'Content-type' : 'application/json',
//                 'Authorization' : `Bearer ${await getTokenForApi()}`
//             },
//             body: JSON.stringify({name})
//         })
//         const data = await res.json();
//         return data;
//     }
// )

export interface IArtistChange {
    name: string | undefined
    description: string | undefined
    artist_genre: string | undefined
    category: string | undefined
    subcategory: string | undefined
    ein: string | undefined
    businessName: string | undefined
    websiteUrl: string | undefined
    phoneNumber: string | undefined
    email: string | undefined
}


export const changeProfileInfo = createAsyncThunk<IArtist, IArtistChange>(
    '@@user/changeArtistOptions',
    async ({ name, description, category, subcategory, ein, businessName, websiteUrl, phoneNumber, email }) => {
        const res = await fetch(`${process.env.BACKEND_URL}/users/current/`, {
            method: 'PUT',
            headers:{
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${await getTokenForApi()}`
            },
            body: JSON.stringify(
                {name, description, subcategory, category, ein, email,
                    business_name: businessName, website: websiteUrl, phone: phoneNumber}
            )
        })
        const data = await res.json();
        return data;
    }
)

export const changeCurrUserPhoto = createAsyncThunk<IUser, ILink>(
    '@@user/changeCurrUserPhoto',
    async (link) => {
        const res = await fetch(`${process.env.BACKEND_URL}/users/current/`, {
            method: 'PUT',
            headers:{
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${await getTokenForApi()}`
            },
            body: JSON.stringify({avatar_url: link})
        })
        const data = await res.json();
        return data;
    }
)


interface IInitialState {
    user?: IUser | IArtist,
    error: boolean,
    status: string
}

const initialState: IInitialState = {
    status: 'idle',
    error: false

}

const userSlice = createSlice({
    name: '@@user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCurrUser.rejected, (state) => {
                state.error = true;
                state.status = 'rejected';
            })
            .addCase(getCurrUser.pending, (state) => {
                state.error = false;
                state.status = 'loading';
            })
            .addCase(getCurrUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = false;
                state.status = 'loaded';
            })
            .addCase(changeProfileInfo.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(changeCurrUserPhoto.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    }
})

export const userReducer = userSlice.reducer;