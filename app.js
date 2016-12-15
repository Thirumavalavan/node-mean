var express = require('express');
var app = express();
app.set('view engine', 'ejs');  
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
var mongoose = require('mongoose');
var dbURI = 'mongodb://catchgjt:root@ds133378.mlab.com:33378 /thirun_employee';

mongoose.connect(dbURI);
var testSchema = new mongoose.Schema({
        name: String,
        email: String,
		DOB:String,
		department:String,
		gender:String
});

var users = mongoose.model('users', testSchema);

app.get('/users', function(req, res){

        users.find({},function(err, user){
                 if (err) throw err;
		res.send(user);
        });
});
app.post('/users', function(req, res, next) {
   var use = new users({
      name: req.body.name,
      email: req.body.email,
	  DOB : req.body.DOB,
	  department:req.body.department,
	  gender:req.body.gender
   });
   console.log(use);
   use.save(function(err, data) {
      if(err) {
         return next(err);
      }
      res.status(201).json(data);
   });
});
app.delete('/users/:id', function(req, res) {
   users.findByIdAndRemove(req.params.id, function(err, user) {
      res.json(user);
   });
});
app.get("/users/:id", function(req,res) {
	console.log('Received findOne person request');
	console.log(req.params.id);
	users.findById(req.params.id, function(err, user){
		console.log(user);
	});
});

app.put('/users/:id', function(req,res){
users.findByIdAndUpdate(req.params.id, function(err,user){	
			  user.name = req.body.name;
              user.email = req.body.email;
			  user.DOB = req.body.DOB;
			  user.department = req.body.department;
			  user.gender = req.body.gender;
			  user.save (function(err,user){
			  if (err) throw err;
			  else{
			  res.send(user);
			  }
			  });
			  });
});


app.get('/', function (req, res) {
res.render('index');
});

app.listen(process.env.PORT || 8080, function(){
console.log("Server started @ 8080");
});