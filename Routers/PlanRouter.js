const express = require("express");
const { create } = require("lodash");
const planRouter = express.Router();

const { 
    getAllPlans, 
    getPlan, 
    createPlan, 
    updatePlan, 
    deletePlan } = require('../controller/planController');

planRouter
    .route('/all')
    .get(getAllPlans);

planRouter
    .route('/top3')
    .get(top3plan);


planRouter.use(protectRoute) //logged in hai ya nhi 
planRouter
    .route('/plan/:id')
    .get(getPlan)

planRouter.use(isAuthorised(['admin','restaurantowner'])) // logged in , lekin role 
planRouter
    .route('/crud')
    .post(createPlan)

planRouter
    .route('/crudPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan)

module.exports = PlanRouter;