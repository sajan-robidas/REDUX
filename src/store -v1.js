// Input Redux
import {combineReducers, createStore} from "redux";
// initial state Reducer
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: 0,
};

// initial state redux
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {...state, balance: state.balance + action.payload};
    case "account/withdraw":
      return {...state, balance: state.balance - action.payload};

    case "account/requestLoad":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoad":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payLoad.fullName,
        nationalID: action.payLoad.nationalID,
        createdAt: action.payLoad.createdAt,
      };
    case "account/updateAccount":
      return {
        ...state,
        fullName: action.payLoad,
      };
    default:
      return state;
  }
}

// Create Root Reducer

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Create Redux CreateStore Step 1
const store = createStore(rootReducer);
// Create Redux dispatch Step 2
// store.dispatch({type: "account/deposit", payload: 500});
// console.log(store.getState());
// store.dispatch({type: "account/withdraw", payload: 200});
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoad",
//   payload: {amount: 1000, purpose: "Bay a Car"},
// });

// console.log(store.getState());

// store.dispatch({type: "account/payLoad"});

// console.log(store.getState());

// Action Creator function redux Step 3
function deposit(amount) {
  return {type: "account/deposit", payload: amount};
}
function withdraw(amount) {
  return {type: "account/withdraw", payload: amount};
}
function requestLoad(amount) {
  return {
    type: "account/requestLoad",
    payload: {amount: amount, purpose: "Bay a Car"},
  };
}
function payLoad() {
  return {type: "account/payLoad"};
}
// dispatch reducer function
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoad(1000));
store.dispatch(payLoad());
console.log(store.getState());

// action Create function
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payLoad: {fullName, nationalID, createdAt: new Date().toISOString()},
  };
}
// Create action function
function updateName(fullName) {
  return {
    type: "account/updateName",
    payLoad: fullName,
  };
}

// dispatch reducer function

store.dispatch(createCustomer("Sajan Robidas", "3456789"));
console.log(store.getState());
