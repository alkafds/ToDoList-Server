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
      status,
    } = req.body;

    try {
      const data = await Todos.create({
      id,
      title,
      description,
      duedate,
      status,
      });
      res.status(201).json({ message: "todos created", data });
    } catch (err) {
      next(err);
    }
  };

  static updateTodos = async (req, res, next) => {
    try {
      const {
        id,
        title,
        description,
        duedate,
        status
      } = req.body;
      const Todo = await Todos.findByPk(id);

      if (!Todo) {
        throw { name: "ErrorNotFound" };
      }

      const updatedTodos = await Todos.update({
        id: id || Todos.id,
        title: title || Todos.title,
        description: description || Todos.description,
        duedate: duedate || Todos.duedate,
        status: status || Todos.status,
        
      });

      res
        .status(200)
        .json({ message: "Todos updated", updatedTodos });
    } catch (err) {
      next(err);
    }
  };

  static deleteTodos = async (req, res, next) => {
    try {
      const { id } = req.body;
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
