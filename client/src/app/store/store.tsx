import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./login/loginSlice";
import { registerReducer } from "./register/registerSlice";
import { modalReducer } from "./modal/modal-slice";
import { adminMenuReducer } from "./admin/adminMenu-slice";
import { showsReducer } from "./shows/showsSlice";
import { userReducer } from "./user/userSlice";
import { adsReducer } from "./ads/ads-slice";
import { sessionsReducer } from "./sessions/sessionsSlice";
import { searchInputReducer } from "./searchInput/searchInput-slice";
import { serviceReducer } from "./service/serviceSlice";

export const store = configureStore({
    reducer:{
        login: loginReducer,
        register: registerReducer,
        modal: modalReducer,
        menuOption: adminMenuReducer,
        shows: showsReducer,
        userInfo: userReducer,
        ads: adsReducer,
        sessions: sessionsReducer,
        inputValue: searchInputReducer,
        services: serviceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: typeof window !== "undefined" && process.env.NODE_ENV !== "production"
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;