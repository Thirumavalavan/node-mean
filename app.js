var express = require('express');
var app = express();
app.set('view engine', 'ejs');  
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
var mongoose = require('mongoose');
var dbURI = 'mongodb://catchgjt:root@ds133378.mlab.com:33378/thirun_employee';

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

        users.find({},function(err, doc){
                 if (err) throw err;
		res.json(doc);
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
   use.save(function(err, doc) {
      if(err) {
         return next(err);
      }
      res.json(doc);
   });
});
app.delete('/users/:id', function(req, res) {
   users.findByIdAndRemove(req.params.id, function(err, doc) {
      res.json(doc);
   });
});
app.get("/users/:id", function(req,res) {
	console.log('Received findOne person request');
	console.log(req.params.id);
	users.findOne(req.params.id, function(err, doc){
		res.json(doc);
	});
});

app.put('/users/:id', function(req,res){
users.findByIdAndUpdate(req.params.id, function(err,doc){	
			  user.name = req.body.name;
              user.email = req.body.email;
			  user.DOB = req.body.DOB;
			  user.department = req.body.department;
			  user.gender = req.body.gender;
			  user.save (function(err,user){
			  if (err) throw err;
			  else{
			  res.json(doc);
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