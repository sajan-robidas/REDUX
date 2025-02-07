import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deposit, payLoad, requestLoad, withdraw} from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  // useDispatch function call
  const dispatch = useDispatch();
  // distructuring redux
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
  } = useSelector((store) => store.account);
  console.log(balance);

  function handleDeposit() {
    if (!depositAmount) return;
    dispatch(deposit(depositAmount, currency));
    // dispatch(deposit(depositAmount));
    setDepositAmount("");
    setCurrency("");
  }
  function handleWithdraw() {
    if (!withdrawAmount) return;
    dispatch(withdraw(withdrawAmount));
    setWithdrawAmount("");
  }
  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoad(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }
  function handlePayLoad() {
    dispatch(payLoad());
  }

  return (
    <div>
      <h2>Your account operation</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">Us Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>
          <button onClick={handleDeposit}>deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(+e.target.value)}
          />
          <button onClick={handleWithdraw}>withdraw {withdrawAmount}</button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>request loan</button>
        </div>
        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ${currentLoan} ({currentLoanPurpose})
            </span>
            <button onClick={handlePayLoad}>pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
