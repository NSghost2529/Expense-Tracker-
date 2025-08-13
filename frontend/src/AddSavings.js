import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

export default function AddSavings() {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const saveSavings = async () => {
    await API.post("/add_savings", { amount_inr: amount });
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Add Savings</h2>
      <input type="number" placeholder="Amount (₹)" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={saveSavings}>Save</button>
    </div>
  );
}
