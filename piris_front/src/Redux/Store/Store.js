import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from "remote-redux-devtools";
import userReducer from "./Reducers/UserReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
    reducer: rootReducer
  }, applyMiddleware(thunk));

export default store;