require('express-async-errors')
const cors = require('cors')
require('dotenv').config();
const express = require('express')
const workoutRouter = require('./routes/workout');
const userRouter = require('./routes/user');
const authenticateUser = require('./middleware/authentication')
const app = express()


app.use(express.json());
app.use(cors());

//connect to DB
const connectDB = require('./db/connect')

//error-handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//routes
app.use('/api/v1/workouts/auth', userRouter)
app.use('/api/v1/workouts', authenticateUser, workoutRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);








const port = process.env.PORT || 5000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();