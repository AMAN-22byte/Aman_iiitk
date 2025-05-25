const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Difficulty: {
    type: String,
    required: true,
  },
  Tags: {
    type: [String],
    required: true,
  },
  Testcase: {
    type: [String],
    required: true,
  },
});

module.exports=mongoose.model("Problem", problemSchema)
