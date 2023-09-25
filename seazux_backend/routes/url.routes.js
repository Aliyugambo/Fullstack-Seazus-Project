const express = require('express');
const urlRouter = express.Router();
const {login_short,handleRedirect,getMyUrl,anony_short,viewUrl,editUrl,deleteUrl} = require('../controllers/Url.controller')
// const {validationMiddleware,linkSchema} = require("../middleware/UrlValidator");
// const {AddUrlValidationMW} = require("../validators/author.validator");
const {isAuthenticated} = require("../authentication/auth");

// urlRouter.get('/',UrlFunc.getUrl);

urlRouter.post('/anony-short',anony_short);
urlRouter.post('/login-short',isAuthenticated,login_short);
urlRouter.get('/:hash',isAuthenticated,handleRedirect);
urlRouter.get('/my-urls',isAuthenticated,getMyUrl);
urlRouter.get('/view/:hash',isAuthenticated,viewUrl);
urlRouter.put('/edit/:hash',isAuthenticated,editUrl);
urlRouter.delete('/delete/:hash',isAuthenticated,deleteUrl);



module.exports = urlRouter; 
