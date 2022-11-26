const express = require("express");
const { create } = require("lodash");
const planRouter = express.Router();

const { 
    getAllPlans, 
    getPlan, 
    createPlan, 
    updatePlan, 
    deletePlan,
    top3plan } = require('../controller/planController');

const {
        isAuthorised,
        protectRoute} = require('../helper');

planRouter
    .route('/all')
    .get(getAllPlans);

planRouter
    .route('/top3')
    .get(top3plan);


planRouter.use(protectRoute) //logged in hai ya nhi 
planRouter
    .route('/Single/:id')
    .get(getPlan)

planRouter.use(isAuthorised(['admin','restaurantowner'])) // logged in , lekin role 
planRouter
    .route('/crud')
    .post(createPlan)

planRouter
    .route('/crudPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan)

module.exports =planRouter ;