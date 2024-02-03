import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./login/loginSlice";
import { registerReducer } from "./register/registerSlice";
import { burgerReducer } from "./burger/burger-slice";

export const store = configureStore({
    reducer:{
        login: loginReducer,
        register: registerReducer,
        burger: burgerReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;