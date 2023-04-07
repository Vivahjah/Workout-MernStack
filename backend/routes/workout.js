const express = require("express");
const router = express.Router();

const {
    getAllWorkout,
    getSingleWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
} = require("../controllers/workout");

router.route("/").get(getAllWorkout).post(createWorkout);
router
    .route("/:id")
    .get(getSingleWorkout)
    .patch(updateWorkout)
    .delete(deleteWorkout);

module.exports = router