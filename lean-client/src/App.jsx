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
          <div className="response-wrapper">
            <div className="toggle-bar">
              <button
                className={`toggle-btn ${viewMode === "json" ? "active" : ""}`}
                onClick={() => setViewMode("json")}
              >
                JSON
              </button>
              <button
                className={`toggle-btn ${viewMode === "clean" ? "active" : ""}`}
                onClick={() => setViewMode("clean")}
              >
                Clean
              </button>
            </div>
            {viewMode === "json" ? (
              <pre>{JSON.stringify(response, null, 2)}</pre>
            ) : (
              <div className="clean-view">
                {Array.isArray(response)
                  ? response.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          marginBottom: "1rem",
                          paddingBottom: "1rem",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {Object.entries(item).map(([key, value]) => (
                          <div key={key}>
                            <strong>{key}:</strong> {value}
                          </div>
                        ))}
                      </div>
                    ))
                  : Object.entries(response).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}:</strong> {value}
                      </div>
                    ))}
              </div>
            )}
          </div>
        ) : (
          <pre>Waiting...</pre>
        )}
      </div>
    </div>
  );
}

export default App;
