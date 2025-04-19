const fs = require("fs");

// Load whitelist tokens from file and trim extra whitespace
const WHITELIST = fs
  .readFileSync("./data/whitelist.txt", "utf-8")
  .split("\n")
  .map((token) => token.trim());

/**
 * Middleware to check the presence and validity of the "lean-token" header.
 */
function authMiddleware(req, res, next) {
  const token = req.headers["lean-token"];

  if (!token || !WHITELIST.includes(token)) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or missing lean-token" });
  }

  next(); // Continue to the next middleware/route
}

module.exports = authMiddleware;
