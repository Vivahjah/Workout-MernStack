import { useContext } from "react";
import { WorkoutsContext } from "../context/workoutContext";

const useWorkoutContext = () => {
    const context = useContext(WorkoutsContext);
    if (!context) {
        throw Error ('Workout context must be use inside the workout Provider');
    }
  return context;
};

export default useWorkoutContext;
