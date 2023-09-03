const express = require("express");
const router = express.Router();
const todosRouter = require("./todos"); // Import your authentication middleware

// Apply authentication middleware globally
// Define routes

router.use("/api/todo", todosRouter);

module.exports = router;
