const express = require("express");
const router = express.Router();
const todosRouter = require("./todos"); // Import your authentication middleware

// Apply authentication middleware globally
// Define routes
router.get("/", (req,res) => {
    console.log(req.oidc.isAuthenticated())
    res.render("index", {
        title: "Todolist",
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user}, 
    )
})
router.use("/api/todo", todosRouter);

module.exports = router;
