import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Auth'
import PlaceReducer from "./places"


const store=configureStore({
    reducer:{auth:AuthReducer,place:PlaceReducer}
})

export default store;