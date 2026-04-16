const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");

const protect = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const { swaggerUi, swaggerDocument } = require("./docs/swagger");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/v1/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

app.get("/api/v1/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user
  });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});