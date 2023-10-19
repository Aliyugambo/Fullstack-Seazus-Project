const express = require('express');
const urlRouter = express.Router();
const {anony_short,login_short,handleRedirect,getMyUrls,viewUrl,editUrl,deleteUrl} = require('../controllers/Url.controller')
// const {validationMiddleware,linkSchema} = require("../middleware/UrlValidator");
// const {AddUrlValidationMW} = require("../validators/author.validator");
const {isAuthenticated} = require("../authentication/auth");

// urlRouter.get('/',UrlFunc.getUrl);

// urlRouter.post('/anony-short',anony_short);
// urlRouter.post('/login-short',isAuthenticated,login_short);
// urlRouter.get('/:hash',isAuthenticated,handleRedirect);
// urlRouter.get('/my-urls',isAuthenticated,getMyUrls);
// urlRouter.get('/view/:hash',isAuthenticated,viewUrl);
// urlRouter.put('/edit/:hash',isAuthenticated,editUrl);
// urlRouter.delete('/delete/:hash',isAuthenticated,deleteUrl);

urlRouter.route('/anony-short').post(anony_short);
urlRouter.route('/login-short').post(isAuthenticated, login_short);
// urlRouter.route('/:hash', isAuthenticated, handleRedirect);
urlRouter.route('/my-urls').get(isAuthenticated, getMyUrls);
urlRouter.route('/view/:hash').get(isAuthenticated, viewUrl);
urlRouter.route('/delete/:hash').delete(isAuthenticated, deleteUrl);
urlRouter.route('/edit/:hash').put(isAuthenticated, editUrl);


module.exports = urlRouter; 
