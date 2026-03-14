const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

exports.createTask = asyncHandler(async (req, res) => {

const task = await Task.create({
    title: req.body.title,
    status: req.body.status,
    createdBy: req.user.id
});

res.status(201).json(task);

});

exports.getTasks = async (req, res) => {
try {

    const tasks = await Task.find({ createdBy: req.user.id });

    res.status(200).json(tasks);

} catch (error) {
    res.status(500).json({ message: error.message });
}
};

exports.updateTask = async (req, res) => {
try {

    const task = await Task.findOne({
    _id: req.params.id,
    createdBy: req.user.id
    });

    if (!task) {
    return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);

} catch (error) {
    res.status(500).json({ message: error.message });
}
};

exports.deleteTask = async (req, res) => {
try {

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

} catch (error) {
    res.status(500).json({ message: error.message });
}
};