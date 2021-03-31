const express = require("express");
const morgan = require("morgan");


//initialization 
const app = express();


//settings 
app.use("port", process.env.PORT || 4000);


//middlewares
app.use(morgan("dev"));


//routes 

//global variables

// starting the server
app.listen(app.get("port"), () =>{
    console.log("listening on port", app.get("port"));
});