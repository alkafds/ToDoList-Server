const express = require("express");
const router = express.Router();
const TodosController = require("../controller/todoController");

router.get("/", TodosController.getAllTodos);
router.post("/", TodosController.createTodos);
router.get("/:id", TodosController.getTodosById)
router.put("/todos/:id", TodosController.updateTodos);
router.delete("/todos/:id", TodosController.deleteTodos);

module.exports = router;