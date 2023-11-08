const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require("cloudinary"); 
const connectDatabase = require('./config/database')

//Handling Uncaught Exception(ex. console.log(a); that is not defined);
// console.log(a);
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Excepetion`);
    process.exit(1);         //used for server shut down
});
// console.log(a);

//config just parent path
dotenv.config();

// Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT || 3000}`);
})



//Unhandled Promise rejection(ex. remove and word from mongodb) (When it occurs then our server is running unnecessary then
//  we try to stop server through below code)
process.on("unhandledRejection", err=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection `);
    server.close(()=>{
        process.exit(1) 
    })
})
