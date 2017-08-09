var express = require('express');
var app = express();
var fs = require("fs");

//enable CORs
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getMembers', function (req, res, next) {
   fs.readFile( __dirname + "/" + "sample-data.json", 'utf8', function (err, data) {
       var contents = JSON.parse(data);
       var members = contents.members;
       //console.log( members );
       res.json( members );
   });
});

app.get('/getPosts', function (req, res, next) {
   fs.readFile( __dirname + "/" + "sample-data.json", 'utf8', function (err, data) {
       var contents = JSON.parse(data);
       var posts = contents.posts;
       //console.log( members );
       res.json( posts );
   });
});

var server = app.listen(3080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})

