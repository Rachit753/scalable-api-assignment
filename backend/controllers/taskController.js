const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");
const {
  createTaskSchema,
  updateTaskSchema
} = require("../validators/taskValidator");

const { successResponse, errorResponse } = require("../utils/apiResponse");

exports.createTask = asyncHandler(async (req, res) => {

  const { error } = createTaskSchema.validate(req.body);

  if (error) {
    return errorResponse(res, 400, error.details[0].message);
  }

  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    createdBy: req.user.id
  });

  return successResponse(res, 201, "Task created successfully", task);
});

exports.getTasks = asyncHandler(async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const status = req.query.status;

  const query = { createdBy: req.user.id };

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(query);

  return successResponse(res, 200, "Tasks fetched successfully", {
    tasks,
    total,
    page,
    pages: Math.ceil(total / limit)
  });
});

exports.getTaskById = asyncHandler(async (req, res) => {

  const task = await Task.findOne({
    _id: req.params.id,
    createdBy: req.user.id
  });

  if (!task) {
    return errorResponse(res, 404, "Task not found");
  }

  return successResponse(res, 200, "Task fetched successfully", task);
});

exports.updateTask = asyncHandler(async (req, res) => {

  const { error } = updateTaskSchema.validate(req.body);

  if (error) {
    return errorResponse(res, 400, error.details[0].message);
  }

  const task = await Task.findOne({
    _id: req.params.id,
    createdBy: req.user.id
  });

  if (!task) {
    return errorResponse(res, 404, "Task not found");
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.status = req.body.status ?? task.status;

  const updatedTask = await task.save();

  return successResponse(res, 200, "Task updated successfully", updatedTask);
});

exports.deleteTask = asyncHandler(async (req, res) => {

  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.id
  });

  if (!task) {
    return errorResponse(res, 404, "Task not found");
  }

  return successResponse(res, 200, "Task deleted successfully");
});