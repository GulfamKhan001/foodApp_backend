const express = require("express");
const reviewRouter = express.Router();
const { isAuthorised, protectRoute } = require('../helper');

const {
    getAllReviews, 
    top3Review, 
    getPlanReview, 
    createReview, 
    updateReview, 
    deleteReview } = require('../controller/reviewController');

reviewRouter
    .route("/all")
    .get(getAllReviews);

reviewRouter
    .route("/top3")
    .get(top3Review);

reviewRouter.use(protectRoute)
reviewRouter
    .route("/:id")
    .get(getPlanReview);

reviewRouter
    .route("/comment/:id")
    .post(createReview);

reviewRouter.use(isAuthorised(['user']))
reviewRouter
    .route("/review/:id")
    .patch(updateReview)
    .delete(deleteReview)


module.exports = reviewRouter;