import React, { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutContext from "../hooks/useWorkoutContext";
import Axios from "../api/axios";

const Home = () => {
  const api = Axios()
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await api.get("/workouts");

        dispatch({ type: "SET_WORKOUT", payload: response.data.workouts });
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorks();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
