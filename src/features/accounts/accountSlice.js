// initial state Reducer
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: 0,
};

export default function accountReducer(state = initialStateAccount, action) {
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

// Action Creator function redux Step 3
export function deposit(amount) {
  return {type: "account/deposit", payload: amount};
}
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
}
