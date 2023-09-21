const express = require("express");
const mysql = require('mysql');


//Create db connection
const db = mysql.createConnection({
    host: 'localhost',
    user:   'root',
    password:   'password',
    database:   'product_listing'
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
        console.log(result);
        res.json(result);
    });


});


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
        console.log('success');
        //console.log(res);
        res.json({Message : "Product Added Successfully"})
    });
})

app.delete('/deleteProduct/:id', (req, res)=>{
    var id = req.params.id;
    //
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
