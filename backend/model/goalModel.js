const { Schema, model } = require("mongoose");

const goalSchema = Schema(
  {
    text: {
      type: String,
      required: [true, "Please add some text"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Goal", goalSchema);
