const express = require('express');
const mongoose = require('mongoose');
const urlRouter = require('./routes/url.routes');
const userRoute = require('./routes/user.routes');
const {handleRedirect} = require('./controllers/Url.controller')
const emailAuthRouter = require('./controllers/Users.controllers');
const analyticRouter = require('./routes/analytics.routes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const logger = require("./logging/logger");
const bodyParser = require("body-parser");
// const config = require("./config/config");
const connectToDb = require('./db/db');
const path = require('path');

var fs = require("fs");
var https = require("https");
// const config = require('./config/config');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(cors({credentials: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE", origin: ['http://localhost:3000', 'http://localhost:4000', 'https://seazux-frontend.onrender.com']}));
// app.use(cors({credentials: true}));// Use this after the variable declaration

// Datebase Connection
connectToDb();
// const corsOptions ={
//   origin:'http://localhost:4000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors());

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

//security middleware
app.use(helmet())

// Routes
app.get('/api/test', (req,res)=>{
  res.send("Health check, API is working !!");
});

app.get('/:hash', handleRedirect);

app.use('/auth-email',emailAuthRouter)
app.use('/api/v1/user',userRoute);
app.use('/api/v1/url',urlRouter);
app.use(analyticRouter);

//Error handler middleware
app.use((err, req, res, next) => {
  // logger.error(err.message)
  console.log(err)
  const errorStatus = err.status || 500
  res.status(errorStatus).send(err.message)
  next()
});


app.use(express.static(path.join(__dirname, "../seazux_frontend/build")));
app.get("/v/*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../seazux_frontend/build/index.html"));
});

//Connect to the database before listening

  app.listen(PORT || 4000, () => {
      console.log(`Server Successfully started at https://localhost:${PORT}`);
  })
