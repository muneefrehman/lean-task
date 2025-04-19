const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const customers = req.app.locals.customers;
  const customer = customers.find((c) => c.customer_id === req.params.id);

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.json(customer);
});

module.exports = router;
