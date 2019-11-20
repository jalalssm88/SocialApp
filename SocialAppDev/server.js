const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const User = require('./api/routes/userRoute');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://jalal:jalal@jobportalapp-jfnab.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true}, ()=>{
    console.log('mongo db connected');
})


// mongoose.connect('mongodb://localhost/job_searching_app', {useNewUrlParser:true})
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'))
// db.once('open', function(){
//     console.log('db connected')
// })

// Use Routes
app.use('/user', User);


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