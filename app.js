const express = require("express");
const app = express();
let cors = require("cors");
console.log(process.env.HELLO);
app.use(cors());
app.use(express.static('public/build'));
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');
const planRouter = require("./Routers/PlanRouter");
const reviewRouter = require("./Routers/reviewRouter");
// const bookingRouter = require("./Routers/bookingRouter");

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/plans", planRouter);
app.use("/review", reviewRouter);
// app.use('/booking', bookingRouter);

app.listen(process.env.PORT || 5000);