const { Todos } = require("../models");

class TodosController {
  static getAllTodos = async (req, res, next) => {
    try {
      const data = await Todos.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  static getTodosById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await Todos.findByPk(id);
      res.status(200).json(data);
    } catch (err) {
      next(err)
    }
  }

  static createTodos = async (req, res, next) => {
    const { id } = req.params;
    const {
      title,
      description,
      duedate,
      priority,
      status,
    } = req.body;

    try {
      const data = await Todos.create({
      id,
      title,
      description,
      duedate,
      priority,
      status,
      });
      res.status(201).json({ message: "todos created", data });
    } catch (err) {
      next(err);
    }
  };

  static updateTodos = async (req, res, next) => {
    const { id } = req.params;
    try {
      const {
        title,
        description,
        duedate,
        priority,
        status
      } = req.body;
  
      const todoToUpdate = await Todos.findByPk(id);
  
      if (!todoToUpdate) {
        throw { name: "ErrorNotFound" };
      }
  
      // Now, update the specific Todo record using the 'update' method
      const updatedTodo = await todoToUpdate.update({
        title: title || todoToUpdate.title,
        description: description || todoToUpdate.description,
        duedate: duedate || todoToUpdate.duedate,
        priority: priority || todoToUpdate.priority,
        status: status || todoToUpdate.status,
      });
  
      res
        .status(200)
        .json({ message: "Todo updated", updatedTodo });
    } catch (err) {
      next(err);
    }
  };

  static deleteTodos = async (req, res, next) => {
    try {
      const { id } = req.params;
      const Todo = await Todos.findByPk(id);

      if (!Todo) {
        throw { name: "ErrorNotFound" };
      }

      await Todo.destroy({
        where: {
          id: Todos.id,
        },
      });

      res.status(200).json({ message: "Todo deleted" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = TodosController;
