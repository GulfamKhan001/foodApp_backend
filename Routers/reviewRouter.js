const express = require("express");
const reviewRouter = express.Router();
const { 
    isAuthorised, 
    protectRoute } = require('../helper');

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

reviewRouter
    .route("/:id")
    .get(getPlanReview);   

reviewRouter.use(protectRoute)
reviewRouter.use(isAuthorised(['user']))
reviewRouter
    .route("/curd/:id")
    .post(createReview)
    .patch(updateReview)
    .delete(deleteReview)


module.exports = reviewRouter;