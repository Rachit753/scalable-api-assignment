const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");
const {
  createTaskSchema,
  updateTaskSchema
} = require("../validators/taskValidator");

exports.createTask = asyncHandler(async (req, res) => {
  const { error } = createTaskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    createdBy: req.user.id
  });

  res.status(201).json(task);
});

exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.id });

  res.status(200).json(tasks);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const { error } = updateTaskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  const task = await Task.findOne({
    _id: req.params.id,
    createdBy: req.user.id
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.status = req.body.status ?? task.status;

  const updatedTask = await task.save();

  res.status(200).json(updatedTask);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.id
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({
    message: "Task deleted successfully"
  });
});