import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./AuthSlice";
import taskReducer from "./TaskSlice"
import submissionReducer from "./SubmissionSlice";

const rootReducer = combineReducers({
    auth:authReducer,
    tasks:taskReducer,
    submissions:submissionReducer
})

const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
})

export default store;