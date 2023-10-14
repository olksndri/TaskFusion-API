const { Schema, model } = require("mongoose");
const { handleSaveError, runValidateAtUpdate } = require("./hooks.js");

const taskSchema = Schema(
  {
    title: {
      type: String,
      max: 250,
      required: true,
    },
    start: {
      type: String,
      required: [true, "Start time is required"],
    },
    end: {
      type: String,
      required: [true, "End time is required"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      required: [true, "Priority is required"],
    },
    date: { type: String, required: [true, "Date is required"] },
    category: {
      type: String,
      enum: ["to-do", "in-progress", "done"],
      required: [true, "Category is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleSaveError);
taskSchema.pre("findOneAndUpdate", runValidateAtUpdate);
taskSchema.post("findOneAndUpdate", handleSaveError);

const Task = model("task", taskSchema);

module.exports = Task;