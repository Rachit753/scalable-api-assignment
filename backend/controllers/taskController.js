const Task = require("../models/Task");

exports.createTask = async (req, res) => {
try {

    const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user.id
    });

    res.status(201).json(task);

} catch (error) {
    res.status(500).json({ message: error.message });
}
};

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