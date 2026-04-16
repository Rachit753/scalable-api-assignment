const express = require("express");
const {
    getAllUsers,
    getAllTasks,
    deleteAnyTask
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);

router.get("/tasks", protect, authorizeRoles("admin"), getAllTasks);

router.delete("/tasks/:id", protect, authorizeRoles("admin"), deleteAnyTask);

module.exports = router;