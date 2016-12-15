var express = require('express');
var app = express();
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

var employee = mongoose.model('users', testSchema);

app.get('/userlist', function(req, res){

        employee.find({},function(err, doc){
                 if (err) throw err;
		res.json(doc);
        });
});

app.route('/userlist').get(function(req,res){
employee.find({},function(err,doc)
{
res.json(doc);
});
}).post(function(req,res){
new employee(req.body).save(function(err,doc){
res.json(doc);
});
});
app.route('/userlist/:id').delete(function(req,res){
var id=req.params.id;
employee.remove({_id:id},function(err,doc){
res.json(doc);
});
}).get(function(req,res){
var id=req.params.id;
employee.findOne({_id:id},function(err,doc){
res.json(doc);
});
}).put(function(req,res){
var id=req.params.id;
employee.update({_id:id},{name:req.body.name,email:req.body.email,DOB:req.body.DOB,department:req.body.department,gender:req.body.gender},function(err,doc){
res.json(doc);
});
});


app.get('/', function (req, res) {
res.sendFile('/index.html' , { root : __dirname});
});

app.listen(process.env.PORT || 8080, function(){
console.log("Server started @ 8080");
});