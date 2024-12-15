const Todo = require("../models/todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks.", error });
  }
};

const getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: "ID is invalid." });
  }
};

const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res
        .status(400)
        .json({ message: "Validation errors.", errors: messages });
    }
    res.status(400).json({ message: "Error creating the task." });
  }
};
const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const updateTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateTodo) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json(updateTodo);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res
        .status(400)
        .json({ message: "Validation errors.", errors: messages });
    }
    res.status(400).send({ message: "Error updating the task." });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(400).send({ message: "Error deleting the task." });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
