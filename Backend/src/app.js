import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))


app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(express.static("public"));

app.use(cookieParser());


//routes import

import userRouter from './routes/login.routes.js';
import employeeRouter from './routes/employee.routes.js';


//routes declaration

// user routes
app.use("/api/users", userRouter);
app.use("/api/employee", employeeRouter);

//post routes

//http://localhost:5000/api/users/login

export { app }