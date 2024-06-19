const express = require("express");
const router = new express.Router
const Student = require("../models/students")

// Create a new student using promises
// router.post("/students", (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })


// using async await
router.post("/students",async(req,res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save()
        res.status(201).send(createUser);
    }catch(err){
        res.status(400).send(err)
    }
})




// read the data of already registered students
router.get("/students",async(req,res)=>{
    try{
       const studentsData = await Student.find();
       res.send(studentsData);
    }catch(err){
        res.send(e);
    }
})

// get the individual students name
router.get("/students/:id",async(req,res)=>{
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
router.patch("/students/:id",async(req,res)=>{
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


// Deleting Student Through Id
router.delete("/students/:id", async (req, res) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = router;