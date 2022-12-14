const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");

module.exports.getAllReviews = async function (req, res) {
  try {
    let allreview = await reviewModel.find();
    if (allreview) {
      return res.json({
        msg: "All review",
        allreview,
      });
    } else {
      return res.json({
        msg: "No review found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.top3Review = async function (req, res) {
  try {
    const reviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    return res.json({
      msg: "top3 reviews",
      reviews
    })
  }
  catch (err) {
    res.json({
      msg: err.message
    })
  }
};

module.exports.getPlanReview = async function (req, res) {
  try {
    const planId = req.params.id;
    let reviews = await reviewModel.find();
    reviews = reviews.filter(review => review.plan["_id"] == planId);
    if (reviews) {
      return res.json({
        msg: "reviews retrieved",
        reviews,
      });
    } else {
      return res.json({
        msg: "No review found",
      });
    }
  } catch (err) {
    // console.log(err);
    res.json({
      msg: err.message,
    });
  }
};

module.exports.createReview = async function (req, res) {
  try {
    let data = req.body;
    const planId = req.params.plan;
    const plan = await planModel.findById(planId); //nep
    let comment = await reviewModel.create(data);
    plan.ratingsAverage =
      (plan.ratingsAverage * plan.nor + req.body.rating) / (plan.nor + 1);
    plan.nor += 1;
    await plan.save();
    await comment.save();
    res.json({
      msg: "review created",
      comment,
    });
  } catch (err) {
    console.log(err);
    res.json({
      err: err.message,
    });
  }
}

module.exports.updateReview = async function (req, res) {
  // console.log(req.body);
  try {
    let planid = req.params.id;
    let id = req.body.id;
    const plan = await planModel.findById(planId);
    let review = await reviewModel.findById(id);
    let reviewToBeUpdated = req.body;
    if (review) {
      const keys = []; //['name','email]
      for (let key in reviewToBeUpdated) {
        if (key == id) continue;
        keys.push(key);
      }
      // plan.ratingsAverage =
      //   (plan.ratingsAverage * plan.nor + req.body.rating) / (plan.nor + 1);
      // plan.nor += 1;
      // await plan.save();
      for (let i = 0; i < keys.length; i++) {
        review[keys[i]] = reviewToBeUpdated[keys[i]];
      }

      const updatedData = await review.save();
      res.json({
        message: "data updated succesfully",
        updatedData,
      });
    } else {
      res.json({
        message: "review not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteReview = async function (req, res) {
  try {
    let planid = req.params.id;
    let id = req.body.id;
    // let doc = await userModel.deleteOne({ email: "abcd@gmail.com" });
    // let doc = await userModel.findOneAndRemove({ email: "abcde@gmail.com" });
    let review = await reviewModel.findByIdAndDelete(id);
    res.json({
      msg: "Review has been deleted",
      review,
    });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};