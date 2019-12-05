const express = require('express');
const router = express.Router();

const CurrentCity = require('../../models/profiles/currentCityModel');
router.post('/add_current_city', (req, res, next)=>{
    const new_current_city = new CurrentCity({
        user_id:req.headers.user_id,
        current_city:req.body.current_city,
    })
    new_current_city.save()
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

router.get('/get_current_city/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('get current city id', id)
    var query ={
        "user_id":id
    }
    CurrentCity.find (query) 
    .select('_id user_id current_city')
    .exec()
    .then(doc => {
        console.log('current city ====', doc)
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