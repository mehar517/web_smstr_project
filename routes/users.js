var express = require('express');
var router = express.Router();
let alert = require('alert');  
const popup = require('node-popup');
var User = require("../models/user");


/* GET users listing. */
router.get('/aboutus', function(req, res, next) {
  res.render('partials/aboutus');
});
router.get('/contactus', function(req, res, next) {
  res.render('partials/contactus');
});
router.get('/register', function(req, res, next) {
  res.render('users/register');
});


router.get('/login', async function(req, res, next) {
  res.render('users/login');
});

router.get('/create',function(request,response,next){
  response.render('topic-create',{message:request.flash('message')});
});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.render('users/login');
});

router.post("/Login",async ( req,res )=>{

  let user = await User.findOne({email:req.body.email});
  if (!user) return res.status(400).send("User not registered");
  console.log("User not Registred");
  let isValid = await User.findOne({password:req.body.password});
  if(!isValid) return res.status(401).send("Invalid Password");
  console.log("Invalid Password");
  req.session.user = user;
  return res.redirect("/products/add");
  

});
  
router.post("/register", async ( req, res ) =>{

  let user = await User.findOne({email:req.body.email});
  if (user) return res.status(400).send("User with given email is already existed");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.save();
  res.redirect('/login');
});




module.exports = router;

