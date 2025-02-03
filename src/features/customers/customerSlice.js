// initial state redux
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
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

// action Create function
export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payLoad: {fullName, nationalID, createdAt: new Date().toISOString()},
  };
}
// Create action function
export function updateName(fullName) {
  return {
    type: "account/updateName",
    payLoad: fullName,
  };
}
