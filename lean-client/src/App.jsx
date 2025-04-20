import { useState } from "react";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [resource, setResource] = useState("customers");
  const [id, setId] = useState("1");
  const [response, setResponse] = useState(null);
  const [viewMode, setViewMode] = useState("json");

  const buildEndpoint = () => {
    if (resource === "account-transactions") {
      return `/accounts/${id}/transactions`;
    } else {
      return `/${resource}/${id}`;
    }
  };

  const callAPI = async () => {
    const endpoint = buildEndpoint();

    try {
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        headers: {
          "lean-token": token,
        },
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: "Fetch failed", details: err.message });
    }
  };

  return (
    <div className="container">
      <div>
        <h2>Lean API Tester</h2>

        <div>
          <label>Lean Token: </label>
          <input value={token} onChange={(e) => setToken(e.target.value)} />
        </div>

        <div>
          <label>Choose Resource: </label>
          <select
            value={resource}
            onChange={(e) => setResource(e.target.value)}
          >
            <option value="customers">Customer</option>
            <option value="accounts">Account</option>
            <option value="transactions">Transaction</option>
            <option value="account-transactions">Account Transactions</option>
          </select>
        </div>

        <div>
          <label>Enter ID: </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <button onClick={callAPI} style={{ marginTop: 10 }}>
          Send Request
        </button>

        <h3>Response:</h3>
        {response ? (
          <pre>{JSON.stringify(response, null, 2)}</pre>
        ) : (
          <pre>Waiting...</pre>
        )}
      </div>
    </div>
  );
}

export default App;
