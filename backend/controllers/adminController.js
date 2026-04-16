const User = require("../models/User");
const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/apiResponse");

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  return successResponse(res, 200, "Users fetched successfully", users);
});

exports.getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find().populate("createdBy", "name email");

    return successResponse(res, 200, "All tasks fetched successfully", tasks);
});

exports.deleteAnyTask = asyncHandler(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
    return errorResponse(res, 404, "Task not found");
    }

    return successResponse(res, 200, "Task deleted by admin");
});