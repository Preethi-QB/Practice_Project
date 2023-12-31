const express = require("express");
const mysql = require('mysql2');
require('dotenv').config()

//Create db connection
const db = mysql.createConnection(
    {
    host: process.env.HOST,
    user:   process.env.DATABASE_USER,
    password:  process.env.DATABASE_PASSWORD,
    database:   process.env.DATABASE
})


db.connect((err) => {
    if(err)
    {
        throw err;
    }
    console.log('Mysql connected')
});


const app = express()
app.use(express.json())
const PORT = 8016;


app.get('/listProduct', (req, res)=>{
    let sql = 'SELECT * FROM PRODUCT';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    });


});

app.get('/test', (req, res)=> {
    res.send("HELLO WORLD");
})

app.post('/addProduct', (req, res)=>{
    let sql = 'INSERT INTO PRODUCT SET ?'
    console.log(req.body)
    let post = {
        name: req.body.name,
        description : req.body.description,
        isMultiColorAvailable: req.body.isMultiColorAvailable,
        price: req.body.price,
        dealTime: req.body.dealTime,
        offerRegionTimeZone:req.body.offerRegionTimeZone
    }
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        res.json({Message : "Product Added Successfully"})
    });
})

app.delete('/deleteProduct/:id', (req, res)=>{
    var id = req.params.id;
    let sql = 'DELETE from PRODUCT WHERE id = ?'
    db.query(sql, [id],     (err, result) => {
        if(err) throw err;
        res.json({Message : "Product Deleted Successfully"})
    })
})

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server running successfully on port " + PORT)
    else
        console.log("Error !")
})
