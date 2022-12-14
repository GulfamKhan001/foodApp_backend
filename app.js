const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');
const planRouter = require("./Routers/PlanRouter");
const reviewRouter = require("./Routers/reviewRouter");
const bookingRouter = require("./Routers/bookingRouter");

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/plan", planRouter);
app.use("/review", reviewRouter);
app.use('/booking', bookingRouter);

app.listen(5000);