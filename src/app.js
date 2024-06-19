const express = require("express");
require("./db/conn")
const Student = require("./models/students")
const app = express();
const port = process.env.PORT || 3000;

// express.json() is a method inbuilt in express to recognize the incoming
// request object as a JSON Object . this method is called a middleware
// in your application using the code :app.use(express.json());
app.use(express.json());

// Create a new student using promises
// app.post("/students", (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })

// using async await
app.post("/students",async(req,res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save()
        res.status(201).send(createUser);
    }catch(err){
        res.status(400).send(err)
    }
})




// read the data of already registered students
app.get("/students",async(req,res)=>{
    try{
       const studentsData = await Student.find();
       res.send(studentsData);
    }catch(err){
        res.send(e);
    }
})

// get the individual students name
app.get("/students/:id",async(req,res)=>{
    try{
       const _id = req.params.id;
       const studentData = await Student.findById({_id});
       console.log(studentData);

       if(!studentData){
        return res.status(201).send();
       }else{
        res.send(studentData);
       }

    }catch(err){
        res.status(500).send(err);
    }
})

// updating student through id
app.patch("/students/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updateStudents);
    }catch(err){
        res.status(404).send(err)
    }
})


app.listen(port, () => {
    console.log(`Successful Connection On ${port}`)
});