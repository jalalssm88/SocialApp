const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require('../../models/users/userModel');

router.post('/signup', (req,res,next)=> {

    console.log('=====', req.body)
    User.find({email:req.body.email})
    .exec()
    .then(user=> {
        console.log('after exec=====', user)
        if(user.length >= 1){
            return res.status(409).json({
                status: "failed",
                message: "User already exist"
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const new_user = new User({
                        first_name:req.body.first_name,
                        last_name:req.body.last_name,
                        email:req.body.email,
                        password:hash,
                        gender:req.body.gender,
                        date_of_birth:req.body.date_of_birth
                    })
                    console.log('here in new userrr ', new_user)
                    new_user.save()
                    .then(result=> {
                        res.status(200).json({
                            status: "success",
                            message: "User successfully created"
                        })
                    })
                    .catch(err=> {
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
        }
    })
})

router.post('/login', (req, res, next)=>{
    console.log('user', req.body)
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        console.log('herere', user)
        if(user.length < 1){
            return res.status(401).json({
                message:"eamil to try to login not found"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message:"Auth failed"
                })
            }
            if(result){
                const token = jwt.sign({
                    userId: user[0]._id,
                    firstName:user[0].first_name,
                    lastName:user[0].last_name,
                },
                    'secret'
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token:'Bearer ' + token,
                    firstName:user[0].first_name,
                    lastName:user[0].last_name,
                    userId:user[0]._id
                })
            }
            res.status(401).json({
                message:"Password does not match"
            })
        })
    })
    .catch(err =>{
        console.log('error here')
        res.status(500).json({
            error:err
        })
    })
})

// router.get(
//     '/current',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//       res.json({
//         id: req.user.id,
//         name: req.user.name,
//         email: req.user.email
//       });
//     }
//   );

router.get('/users', (req, res)=>{
    User.find().then(user=>{
        res.json({
            user:user
        })
    })
})
router.get('/userslist', (req, res)=>{
   const data = {
       "id":"5",
       "name":"jalal uddin"
   }
    res.json({
        user:data
    })
})

module.exports = router;