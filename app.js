/*
deparment : {
    "name" , "location" , _id
}
*/
const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRouter = require("./routers/student.router");
const departmentRouter = require("./routers/department.router");
const loginRouter = require("./routers/login.router");
const AuthMD = require("./auth/auth.md");

const server = express();
mongoose.connect('mongodb://localhost:27017/btest').then(
    () => {
        console.log("Db is connected");
        server.listen(8000, () => {
            console.log("server is listining");
        })
    }
).catch((err) => {
    console.log("Db error" + err);
});



//  middleware 
// deal with req handling req 
// first mw 

server.use(bodyParser.json());
server.use((requset, response, next) => {
    console.log(requset.url, requset.method, requset.headers);
    next();
})

server.use("/student", studentRouter);
server.use("/login", loginRouter);
server.use(AuthMD);
server.use("/department", departmentRouter);

// second auth 
server.use("", async (req, res) => {
    res.status(404).json("wrong url not found")
})
// error middleware 
server.use((err, req, res, next) => {
    console.log("********************************* from error middleware *****************");
    console.log(err?.stack, 'error stack');
    res.status(err.status).json(err.message);
})
