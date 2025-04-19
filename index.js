// index.js
const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const auth = require("./middleware/auth");
const loadCSV = require("./utils/loadCSV");
const cors = require("cors");

// Load environment variables
dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 3000;

// Apply auth middleware globally
app.use(auth);

// Async function to load CSV data and start server
async function startServer() {
  try {
    const customers = await loadCSV(path.join(__dirname, "data/customer.csv"));
    const accounts = await loadCSV(path.join(__dirname, "data/account.csv"));
    const transactions = await loadCSV(
      path.join(__dirname, "data/transaction.csv")
    );

    // Save to locals so routes can access this data
    app.locals.customers = customers;
    app.locals.accounts = accounts;
    app.locals.transactions = transactions;

    console.log("✅ CSV data loaded successfully");

    // Route setup
    app.use("/customers", require("./routes/customers"));
    app.use("/accounts", require("./routes/accounts"));
    app.use("/transactions", require("./routes/transactions"));

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error loading data or starting server:", err);
  }
}

startServer();
