const express=require("express")
const app= express();
const userRoute=require("./routes/userRoute");

const mongoose = require('mongoose');
const cors= require("cors");

app.use(cors());
const dotenv=require('dotenv');

// const User=require("./models/usermodels");
app.use(express.json());

dotenv.config();
mongoose.connect(process.env.URI)
.then(()=>{
    console.log("connected successfully");
    app.listen(process.env.PORT || 4000, (err)=>{
        if(err) console.log(err);
        console.log("running successfully at", process.env.PORT);
    });
})
.catch((error)=>{
    console.log("error",error);
})

app.use(userRoute);





// app.listen(5000); 