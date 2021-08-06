var express = require("express");
var router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
var mysql = require("mysql");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api"
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL connected...");
  }
});

/* GET home page. */
// router.get("/api", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
 
router.get("/welcome", function (req, res, next) {
  // sql = connection.query("SELECT * FROM customerapi")
  // console.log(" harshit jain is i agood boy", sql);
  connection.query("SELECT * FROM customerapi", function(err , rows, fields){
     
    if(err) throw err

    console.log(rows)
    res.render('welcome', {tittle: 'Users Details', items: rows})
  })

  // res.render("welcome", { title: "Express" });
});

router.use(function (req,res,next) {
  console.log("/api" + req.method);
  next();
});
 
router.post("/api", function (request, response) {
  console.log(request.body);

  var data = {};
  data = request.body;
  console.log(data);

  var sql = "INSERT INTO customerapi (name , email , first_round , second_round , third_round) VALUES ('" + data.Name + "','" + data.Email + "','" +  data.First_round + "','" + data.Second_round + "','" + data.Third_round + "')";
    connection.query(sql, function (error, result) {
      if (error) {
        console.log(error);
      };
      // response.sendStatus(200);
      // response.redirect("/home") TOP 1 record;
      // console.log(results);
      // connection.query( "SELECT * FROM customerapi  " , function(error, result){
      //   // connection.query( "SELECT MAX(Id) FROM api  " , function(error, result){
      //     console.log(result);
      //     response.json( {data: result});
      //   }) 
        // response.json( {data: result});
        // response.render("home", {data: result});
      // response.render("home", { title: "Express" });

       console.log("1 record inserted")
     }) 
     
     
  response.render("welcome", { title: "Express" });
})

// router.post("/welcome", function (request, response) {
//   sql = connection.query("SELECT * FROM customerapi ORDER BY name");
//   while(result = connection.fetch.array(sql)){
//   //- $.get( "http://localhost:3000/auther", function( data ) {
//   //-     $( "#display" ).html( data );
//   //-     alert( "Load was performed." );
//   //-   }); 
//   var display = document.getElementById('#display')
//   ("display").innerhtml(result); 
//   }
// })
 

module.exports = router;
