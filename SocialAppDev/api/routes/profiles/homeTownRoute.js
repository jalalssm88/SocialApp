const express = require('express');
const router = express.Router();

const HomeTown = require('../../models/profiles/homeTownModel');
router.post('/add_current_city', (req, res, next)=>{
    const new_home_town = new HomeTown({
        user_id:req.headers.user_id,
        home_town:req.body.home_town,
    })
    new_home_town.save()
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
    console.log('user id in school', id)
    var query ={
        "user_id":id
    }
    HomeTown.find (query) 
    .select('_id user_id home_town')
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