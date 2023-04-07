const Workout = require("../models/workout");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const createWorkout = async (req, res) => {
  const { userId } = req.user;
  const { title, reps, loads } = req.body;

  if (title === "" || reps === "" || loads === "") {
    throw new BadRequestError("please fill in all fields");
  }
  const workout = await Workout.create({ title, reps, loads, userId });
  res.status(StatusCodes.CREATED).json({ workout });
};
const updateWorkout = async (req, res) => {
  const {
    body: { title, reps, loads },
    params: { id: workoutId },
  } = req;
  if (title === "" || reps === "" || loads === "") {
    throw new BadRequestError("title or reps or loads cannot be empty");
  }
  const workout = await Workout.findByIdAndUpdate(
    { _id: workoutId },
    req.body,
    { runValidators: true, new: true }
  );
  if (!workout) {
    throw new NotFoundError(`No workout with id ${workoutId}`);
  }
  res.status(StatusCodes.OK).json({ workout });
};

const deleteWorkout = async (req, res) => {
  const { id: workoutId } = req.params;
  const workout = await Workout.findByIdAndDelete({ _id: workoutId });
  if (!workout) {
    throw new NotFoundError(`No job with id ${workoutId}`);
  }
  res.status(StatusCodes.OK).json({ workout });
};

const getSingleWorkout = async (req, res) => {
  const { id: workoutId } = req.params;
  const workout = await Workout.findOne({ _id: workoutId });
  if (!workout) {
    throw new NotFoundError(`No workout with id ${workoutId}`);
  }
  res.status(StatusCodes.OK).json({ workout });
};
const getAllWorkout = async (req, res) => {
    const {userId} = req.user
  const workouts = await Workout.find({ userId }).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({ workouts, count: workouts.length });
};

module.exports = {
  getAllWorkout,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
