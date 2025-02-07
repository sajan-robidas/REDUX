import {createSlice} from "@reduxjs/toolkit";

// initial state Reducer
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: 0,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoad: {
      prepare(amount, purpose) {
        return {
          payload: {amount, purpose},
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoad(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

export const {withdraw, requestLoad, payLoad} = accountSlice.actions;

// Action Creator function redux Step 3
export function deposit(amount, currency) {
  if (currency === "USD") return {type: "account/deposit", payload: amount};
  return async function (dispatch, getState) {
    dispatch({type: "account/convertingCurrency"});
    //API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    // return action
    const converted = data.rates.USD;
    dispatch({type: "account/deposit", payload: converted});
  };
}

export default accountSlice.reducer;

/*


export function withdraw(amount) {
  return {type: "account/withdraw", payload: amount};
}
export function requestLoad(amount) {
  return {
    type: "account/requestLoad",
    payload: {amount: amount, purpose: "Bay a Car"},
  };
}
export function payLoad() {
  return {type: "account/payLoad"};
} */
