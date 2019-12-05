const express = require('express');
const router = express.Router();

const WorkPlace = require('../../models/profiles/workPlaceModel');
router.post('/add_work_place', (req, res, next)=>{
    console.log('work place', req.body)
    const new_work_place = new WorkPlace({
        user_id:req.headers.user_id,
        work_place:req.body.work_place,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        is_working:req.body.is_working,
        job_title:req.body.job_title
    })
    new_work_place.save()
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

router.get('/get_work_place/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('user id in work place', id)
    var query ={
        "user_id":id
    }
    WorkPlace.find (query) 
    .select('_id user_id work_place start_date end_date is_working job_title')
    .exec()
    .then(doc => {
        console.log('work place ====', doc)
        doc.reverse();
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