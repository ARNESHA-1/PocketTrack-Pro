import { useState, useMemo, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";

// ---------- UI Components ----------
const Card = ({ children }) => (
  <div
    style={{
      background: "var(--card)",
      padding: 18,
      borderRadius: 14,
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      color: "var(--text)",
      transition: "0.2s"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    {children}
  </div>
);

const Button = ({ children, ...props }) => (
  <button
    style={{
      padding: "8px 14px",
      background: "#4f46e5",
      color: "#fff",
      borderRadius: 8,
      border: "none",
      cursor: "pointer"
    }}
    {...props}
  >
    {children}
  </button>
);

// ---------- Initial Data ----------
const initialData = [
  { id: 1, date: "2026-04-01", amount: 1200, category: "Salary", type: "income" },
  { id: 2, date: "2026-04-02", amount: 50, category: "Food", type: "expense" },
  { id: 3, date: "2026-04-03", amount: 200, category: "Shopping", type: "expense" },
  { id: 4, date: "2026-04-03", amount: 300, category: "Freelance", type: "income" }
];

export default function App() {
  const [dark, setDark] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("tx");
    return saved ? JSON.parse(saved) : initialData;
  });
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");

  // ---------- Persist data ----------
  useEffect(() => {
    localStorage.setItem("tx", JSON.stringify(transactions));
  }, [transactions]);

  // ---------- Dark mode ----------
  useEffect(() => {
    document.body.style.background = dark ? "#0f172a" : "#f3f4f6";
    document.body.style.color = dark ? "#f9fafb" : "#111827";
  }, [dark]);

  const theme = {
    "--card": dark ? "#1e293b" : "#ffffff",
    "--text": dark ? "#f9fafb" : "#111827"
  };

  // ---------- Filtering ----------
  const filtered = useMemo(() => {
    return transactions.filter(t =>
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  // ---------- Calculations ----------
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;
  const savingsRate = income ? ((balance / income) * 100).toFixed(1) : 0;

  // ---------- Profile Health ----------
  const profileHealth = useMemo(() => {
    if (income === 0) return { label: "No Data", color: "gray" };

    const ratio = expenses / income;

    if (ratio < 0.5) return { label: "Excellent", color: "#10b981" };
    if (ratio < 0.8) return { label: "Good", color: "#f59e0b" };
    return { label: "Needs Attention", color: "#ef4444" };
  }, [income, expenses]);

  // ---------- Chart Data ----------
  const lineData = transactions.map(t => ({
    date: t.date,
    value: t.type === "income" ? t.amount : -t.amount
  }));

  const pieData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
        acc[t.category].value += t.amount;
      }
      return acc;
    }, {})
  );

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

  // ---------- Actions ----------
  const addTransaction = () => {
    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      amount: Math.floor(Math.random() * 200) + 20,
      category: "Misc",
      type: Math.random() > 0.5 ? "income" : "expense"
    };
    setTransactions(prev => [...prev, newTx]);
  };

  const deleteTx = id => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: 20, minHeight: "100vh", ...theme }}>
      <div style={{ maxWidth: 1200, margin: "auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <h1 style={{ color: dark ? "#60a5fa" : "#1d4ed8" }}>
            💰 PocketTrack Pro
          </h1>

          <div style={{ display: "flex", gap: 10 }}>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>

            <Button onClick={() => setDark(!dark)}>
              {dark ? "☀️" : "🌙"}
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 16,
          marginTop: 20
        }}>
          <Card>
            <h3>Balance</h3>
            <p>${balance}</p>
          </Card>

          <Card>
            <h3>Income</h3>
            <p>${income}</p>
          </Card>

          <Card>
            <h3>Expenses</h3>
            <p>${expenses}</p>
          </Card>

          <Card>
            <h3>Savings Rate</h3>
            <p>{savingsRate}%</p>
          </Card>

          <Card>
            <h3>Profile Health</h3>
            <p style={{ color: profileHealth.color, fontWeight: "bold" }}>
              {profileHealth.label}
            </p>
            <small>Based on spending vs income</small>
          </Card>
        </div>

        {/* Charts */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 16,
          marginTop: 20
        }}>
          <Card>
            <h3>Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <XAxis dataKey="date" stroke={dark ? "#e5e7eb" : "#374151"} />
                <YAxis stroke={dark ? "#e5e7eb" : "#374151"} />
                <Tooltip />
                <Line dataKey="value" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3>Spending</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={80}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3>Income vs Expense</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { name: "Income", value: income },
                { name: "Expense", value: expenses }
              ]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Transactions */}
        <div style={{ marginTop: 20 }}>
          <Card>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                placeholder="Search category"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />

              {role === "admin" && (
                <Button onClick={addTransaction}>Add</Button>
              )}
            </div>

            <table width="100%" style={{ marginTop: 10 }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                  {role === "admin" && <th></th>}
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5">No data</td>
                  </tr>
                ) : (
                  filtered.map(t => (
                    <tr key={t.id}>
                      <td>{t.date}</td>
                      <td>{t.category}</td>
                      <td>{t.type}</td>
                      <td>${t.amount}</td>
                      {role === "admin" && (
                        <td>
                          <Button onClick={() => deleteTx(t.id)}>
                            Delete
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>
        </div>

      </div>
    </div>
  );
}