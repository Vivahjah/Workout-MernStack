const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    loads: {
      type: Number,
      required: true,
    },
    userId : {
        type: String,
        required: true
    }
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema);
