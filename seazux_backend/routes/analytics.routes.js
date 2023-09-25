const express = require('express');
const analyticRouter = express.Router();
const {getAnalytics,urlAnalytics,groupAnalytics,getClicks} = require("../controllers/Analytic.controller");
const {isAuthenticated} = require("../authentication/auth");



analyticRouter.get("/api/analytics/getAll",isAuthenticated,getAnalytics);
analyticRouter.get("/api/analytics/clicks",isAuthenticated,getClicks);
analyticRouter.get("/api/analytics/url/:hash",isAuthenticated,urlAnalytics);
analyticRouter.get("/api/analytics/url/group/:id",isAuthenticated,groupAnalytics);
// analyticRouter.get("/report/:hash",isAuthenticated,AnalyticFunc.genrateUrlReport);

module.exports = analyticRouter; 