const mongoose = require("mongoose")
const config = require('../config/config');
const logger = require("../logging/logger");


const connectToDb = async () => {
    // try {
    //   const conn = await mongoose.connect(process.env.MONGODB_URL);
    //   console.log(`MongoDB Connected: ${conn.connection.host}`);
    // } catch (error) {
    //   console.log(error);
    //   process.exit(1);
    // }

    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
   }).then(()=>{
       console.log(`connection to database established`)
   }).catch(err=>{
       console.log(`db error ${err.message}`);
       process.exit(-1)
   })
  }

module.exports = connectToDb


