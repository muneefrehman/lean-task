const request = require("supertest");
const express = require("express");
const auth = require("../middleware/auth");
const loadCSV = require("../utils/loadCSV");

// Load your route handlers
const customerRoutes = require("../routes/customers");
const accountRoutes = require("../routes/accounts");
const transactionRoutes = require("../routes/transactions");

let app;

beforeAll(async () => {
  app = express();

  // Load CSV data
  const customers = await loadCSV("./data/customer.csv");
  const accounts = await loadCSV("./data/account.csv");
  const transactions = await loadCSV("./data/transaction.csv");

  app.locals.customers = customers;
  app.locals.accounts = accounts;
  app.locals.transactions = transactions;

  app.use(auth); // token validation middleware
  app.use("/customers", customerRoutes);
  app.use("/accounts", accountRoutes);
  app.use("/transactions", transactionRoutes);
});

const validToken = "sdf79a8sd7f79adf";
const invalidToken = "invalid-token";

describe("API Tests", () => {
  test("GET /customers/1 - success", async () => {
    const res = await request(app)
      .get("/customers/1")
      .set("lean-token", validToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.customer_id).toBe("1");
  });

  test("GET /accounts/1 - success", async () => {
    const res = await request(app)
      .get("/accounts/1")
      .set("lean-token", validToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.account_id).toBe("1");
  });

  test("GET /transactions/1 - success", async () => {
    const res = await request(app)
      .get("/transactions/1")
      .set("lean-token", validToken);

    expect(res.statusCode).toBe(200);
    expect(res.body.transcation_id).toBe("1");
  });

  test("GET /accounts/1/transactions - success", async () => {
    const res = await request(app)
      .get("/accounts/1/transactions")
      .set("lean-token", validToken);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Unauthorized if no token", async () => {
    const res = await request(app).get("/customers/1");

    expect(res.statusCode).toBe(401);
  });

  test("Unauthorized if invalid token", async () => {
    const res = await request(app)
      .get("/customers/1")
      .set("lean-token", invalidToken);

    expect(res.statusCode).toBe(401);
  });
});
