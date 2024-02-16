import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./login/loginSlice";
import { registerReducer } from "./register/registerSlice";
import { modalReducer } from "./modal/modal-slice";
import { adminMenuReducer } from "./admin/adminMenu-slice";
import { showsReducer } from "./shows/showsSlice";
import { userReducer } from "./user/userSlice";

export const store = configureStore({
    reducer:{
        login: loginReducer,
        register: registerReducer,
        modal: modalReducer,
        menuOption: adminMenuReducer,
        shows: showsReducer,
        userInfo: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;