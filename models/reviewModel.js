const mongoose = require("mongoose");
const { db_link } = require("../secrets");
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("review db connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
});

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        maxLength: [20, `Comment should exceed 20 characters`]
    },
    rating: {
        type: Number,
        required: true,
        min:1,
        max:10,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.objectId,
        ref: "userModel",
        required : [true, "Vaild User required"]
    },
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = reviewModel;