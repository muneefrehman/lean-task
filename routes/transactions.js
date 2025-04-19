const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const transactions = req.app.locals.transactions;
  const transaction = transactions.find(
    (t) => t.transcation_id === req.params.id
  );

  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  res.json(transaction);
});

module.exports = router;
