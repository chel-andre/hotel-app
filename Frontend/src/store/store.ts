import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userReducer";
import searchReducer from "../redux/searchReducer";
import refReducer from "../redux/refReducer";



const store = configureStore({
 reducer:{
    user: userReducer,
    search: searchReducer,
    ref: refReducer
    
 }
});

export {store};
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch