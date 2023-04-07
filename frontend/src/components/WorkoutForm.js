import Axios from "../api/axios";
import React, { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const api = Axios();
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();
  const [reps, setReps] = useState("");
  const [loads, setLoads] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const workout = { title, loads, reps };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return setError("You must be logged in");
    }
    try {
      const response = await api.post("/workouts", workout);

      setLoads("");
      setTitle("");
      setReps("");
      setError(null);
      dispatch({ type: "CREATE_WORKOUT", payload: response.data.workout });
    } catch (error) {
      setError(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a workout</h3>
      <label>Excercise Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Loads (kg)</label>
      <input
        type="number"
        onChange={(e) => setLoads(e.target.value)}
        value={loads}
      />
      <label>Reps (kg)</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
