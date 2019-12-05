const express = require('express');
const router = express.Router();

const University = require('../../models/profiles/universityModel');
router.post('/add_university', (req, res, next)=>{
    const university = new University({
        user_id:req.headers.user_id,
        university:req.body.university,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        is_graduated:req.body.is_graduated,
    })
    university.save()
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

router.get('/get_university/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('user id in work place', id)
    var query ={
        "user_id":id
    }
    University.find (query) 
    .select('_id user_id university start_date end_date is_graduated')
    .exec()
    .then(doc => {
        console.log('work place ====', doc)
        doc.reverse()
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