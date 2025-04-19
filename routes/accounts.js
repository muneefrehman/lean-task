const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const accounts = req.app.locals.accounts;
  const account = accounts.find((a) => a.account_id === req.params.id);

  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }

  res.json(account);
});

router.get("/:id/transactions", (req, res) => {
  const transactions = req.app.locals.transactions;
  const accountId = req.params.id;

  const accountTransactions = transactions
    .filter((t) => t.account_id === accountId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // reverse time order

  res.json(accountTransactions);
});

module.exports = router;
