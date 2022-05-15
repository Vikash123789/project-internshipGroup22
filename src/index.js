const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://priyanka:PriyankaRajput@cluster0.fhqcn.mongodb.net/project-2-DB?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('WelCome to College Internship Site'))
    .catch(err => console.log(err))




app.use('/', route);


 

app.listen(process.env.PORT || 3500, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3500))
});


