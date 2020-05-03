const express = require('express');

const app = express();
const jwt = require('jsonwebtoken');

if(typeof localStorage == "undefined" || localStorage == null){
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
function checkLogin(req, res, next){
    const token = localStorage.getItem('token');
    try{
        jwt.verify(token, 'shhhh');
    }
    catch(err){
        res.send("You need to login");
    }
    next(); 
}
app.get("/", checkLogin, (req, res)=>{
   res.send("hello, World and welcome");
});
app.get('/login', (req, res)=>{
    const token = jwt.sign({foo:'bar'}, 'shhhh');
    localStorage.setItem('token', token);
  res.send('login successfully');
});

app.get('/logout', (req, res)=>{
    localStorage.removeItem('token');
    res.send('Logout successfully');
});

app.listen('5000', () =>{
   console.log("App is linteing to port 5000");
});