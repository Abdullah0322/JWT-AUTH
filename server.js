require('dotenv').config()

const express = require ("express")
const app=express()
const jwt= require("jsonwebtoken")
app.use(express.json())

const posts=[
{
username: "Abdullah",
email: "abdullah@gmail.com",
title:"Post 1",
password:"123"



},
{
    username: "Dante",
    email: "dante@gmail.com",
    title:"Post 2",
    password:"123"
    
    
    },
    
    {
        username: "Nero",
        email: "nero@gmail.com",
        title:"Post 3",
        password:"123"
        
        
        },
        

]
app.get('/posts',authenticateToken,(req,res)=>{
res.json(posts.filter(post=>post.username===req.user.name))
})



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

app.listen(3000)