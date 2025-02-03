import {useState} from "react";
import {useDispatch} from "react-redux";
import {createCustomer} from "./customerSlice";

function CreateCustomer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  // store useDispatch redux
  const dispatch = useDispatch();
  // Action Creator redux
  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }
  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <label>Customer full name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>create new customer</button>
      </div>
    </div>
  );
}

export default CreateCustomer;
