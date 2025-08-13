import React, { useEffect, useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const expRes = await API.get("/expenses");
    const sugRes = await API.get("/ai_suggestions");
    setExpenses(expRes.data);
    setSuggestions(sugRes.data);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate("/add-expense")}>Add Expense</button>
      <button onClick={() => navigate("/add-savings")}>Add Savings</button>

      <h3>Your Expenses</h3>
      <ul>
        {expenses.map((e, idx) => (
          <li key={idx}>{e.category}: ₹{e.amount_inr}</li>
        ))}
      </ul>

      <h3>AI Suggestions</h3>
      <ul>
        {suggestions.map((s, idx) => (
          <li key={idx}>{s.tip} - Save ₹{Math.round(s.potential_savings_inr)}</li>
        ))}
      </ul>
    </div>
  );
}
