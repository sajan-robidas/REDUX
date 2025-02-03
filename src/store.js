// Input Redux
import {combineReducers, createStore} from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
// Create Root Reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Create Redux CreateStore Step 1
const store = createStore(rootReducer);

export default store;
