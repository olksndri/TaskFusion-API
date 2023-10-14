const { Schema, model } = require("mongoose");
const { handleSaveError, runValidateAtUpdate }= require("./hooks.js");

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    rating: {
      type: Number,
    },
    review: {
      type: String,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

reviewSchema.post("save", handleSaveError);

reviewSchema.pre("findOneAndUpdate", runValidateAtUpdate);

reviewSchema.post("findOneAndUpdate", handleSaveError);

const Review = model("review", reviewSchema);

module.exports = Review;
