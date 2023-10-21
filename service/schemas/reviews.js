const { Schema, model } = require("mongoose");
const { handleSaveError, runValidateAtUpdate } = require("./hooks.js");

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
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
