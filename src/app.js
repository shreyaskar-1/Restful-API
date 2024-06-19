const express = require("express");
require("./db/conn")
const studentRouter = require("./routers/student")
const app = express();
const port = process.env.PORT || 3000;

// express.json() is a method inbuilt in express to recognize the incoming
// request object as a JSON Object . this method is called a middleware
// in your application using the code :app.use(express.json());
app.use(express.json());
app.use(studentRouter);

// adding express router in Restful api
// create a new router
// const router = new express.Router();

// 2. define the router
// router.post("/students", async (req, res) => {
//     res.send ("hello whatsup");
// })

// register the router
// app.use(router);



app.listen(port, () => {
    console.log(`Successful Connection On ${port}`)
});