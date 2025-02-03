// Input Redux
import {applyMiddleware, combineReducers, createStore} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {configureStore} from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Create Root Reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Create Redux CreateStore Step 1
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
