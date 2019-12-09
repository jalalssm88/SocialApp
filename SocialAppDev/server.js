const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const User = require('./api/routes/users/userRoute');
const cover_pic = require('./api/routes/profiles/coverPictureRoute')
const profile_pic = require('./api/routes/profiles/profilePictureRoute')
const work_place = require('./api/routes/profiles/workPlaceRoute')
const school = require('./api/routes/profiles/schoolRoute')
const university = require('./api/routes/profiles/universityRoute')
const current_city = require('./api/routes/profiles/currentCityRoute')
const home_town = require('./api/routes/profiles/homeTownRoute')
const upload_images = require('./api/routes/profiles/uploadImagesRoute')

app.use('/uploads',express.static("uploads"))

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://jalal:123@socialapp-wbe7k.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true}, ()=>{
    console.log('mongo db connected');
})


// mongoose.connect('mongodb://localhost/socialApp', {useNewUrlParser:true})
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'))
// db.once('open', function(){
//     console.log('db connected')
// })

// Use Routes

app.use('/user', User);
app.use('/cover_pic', cover_pic)
app.use('/profile_pic', profile_pic)
app.use('/work_place', work_place)
app.use('/school', school)
app.use('/university', university)
app.use('/current_city', current_city)
app.use('/home_town', home_town)
app.use('/images', upload_images)


app.use((req, res, next)=> {
  const error = new Error('Not found');
  error.status = 404;
  next(error)
})

app.use((error, req, res, next)=>{
  res.status(error.status || 500)
  res.json({
      error:{
          message:error.message
      }
  })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));