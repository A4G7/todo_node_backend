const mongoose = require("../config/dbConfig");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "The title is required."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "The description is required."],
    trim: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
