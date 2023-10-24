const { Schema, model } = require("mongoose");
const { handleSaveError, runValidateAtUpdate } = require("./hooks.js");
const formatDate = require("../../utilities/index.js");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      max: 250,
      default: "My Task",
      required: [true, "Title is required"],
    },
    start: {
      type: String,
      default: "09:00",
      required: [true, "Start time is required"],
    },
    end: {
      type: String,
      default: "09:30",
      required: [true, "End time is required"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      trim: true,
      required: [true, "Priority is required"],
    },
    date: {
      type: String,
      default: formatDate,
      required: [true, "Date is required"],
    },
    category: {
      type: String,
      enum: ["to-do", "in-progress", "done"],
      default: "to-do",
      trim: true,
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

const taskUpdateSchema = new Schema(
  {
    title: {
      type: String,
      max: 250,
      default: "My Task",
    },
    start: {
      type: String,
      default: "09:00",
    },
    end: {
      type: String,
      default: "09:30",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      trim: true,
    },
    date: {
      type: String,
      default: formatDate,
    },
    category: {
      type: String,
      enum: ["to-do", "in-progress", "done"],
      default: "to-do",
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleSaveError);
taskUpdateSchema.pre("findOneAndUpdate", runValidateAtUpdate);
taskUpdateSchema.post("findOneAndUpdate", handleSaveError);

const Task = model("task", taskSchema);

module.exports = Task;
