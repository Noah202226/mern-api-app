const Goal = require("../model/goalModel");
const asyncHandler = require("express-async-handler");
// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// @desc Set Goals
// @route Post /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw Error("Please add text field");
  }

  const goal = await Goal.create({ text: req.body.text });

  res.status(200).json(goal);
});

// @desc Update Goals
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc Get Goals
// @route GET /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Delete Goal: ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
