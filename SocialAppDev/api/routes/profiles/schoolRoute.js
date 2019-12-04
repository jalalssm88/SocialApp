const express = require('express');
const router = express.Router();

const School = require('../../models/profiles/schoolModel');
router.post('/add_school', (req, res, next)=>{
    console.log('school', req.body)
    const new_school = new School({
        user_id:req.headers.user_id,
        school:req.body.school,
        class_year:req.body.class_year,
    })
    new_school.save()
    .then(picture => {
        res.status(200).json({
            status:"success",
            message: 'Profile picture successfully uploaded',
        });
    })
    .catch(err => {
       res.status(500).json({
           error:err
       })
    })
});

router.get('/get_school/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('user id in school', id)
    var query ={
        "user_id":id
    }
    School.find (query) 
    .select('_id user_id school class_year')
    .exec()
    .then(doc => {
        console.log('school ====', doc)
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({
                message: "no data found against this id",
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;