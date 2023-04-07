import Axios from "../api/axios";
import React from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const api = Axios()
  const { dispatch } = useWorkoutContext();
  const handleDelete = async () => {
    try {
      const response = await api.delete("/workouts/" + workout._id);
      dispatch({ type: "DELETE_WORKOUT", payload: response.data.workout });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Loads (kg) : </strong>
        {workout.loads}
      </p>
      <p>
        <strong>Reps (kg) : </strong>
        {workout.reps}
      </p>

      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleDelete} className="material-symbols-outlined">
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
