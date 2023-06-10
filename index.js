const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const {connection} = require("./config/db");
const {userRouter} = require("./routes/User.routes");
const {emiRouter} =require("./routes/Emi.routes")
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/users" ,userRouter);
app.use("/emi",emiRouter);

app.listen(process.env.PORT , async()=>{
    try {
        await connection;
        console.log("connected to the db");
    } catch (error) {
        console.log("cannot connect to the db")
    }
    console.log(`server is running at port ${process.env.PORT}`)
}
)