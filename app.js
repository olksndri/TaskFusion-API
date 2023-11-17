const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const {
  authRouter,
  reviewsRouter,
  userRouter,
  tasksRouter,
} = require("./routes/index");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/api-docs", cors(), swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/reviews", reviewsRouter);
app.use("/tasks", tasksRouter);

app.use("/health-check", (req, res) => {
  res.status(200).json({ message: "Ok" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
