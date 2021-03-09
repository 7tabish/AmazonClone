const express=require('express');
const app= express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');

const Product=require('./API/routes/Product');
const Category=require('./API/routes/category');
const SubCategory = require('./API/routes/SubCategory');
const Brand = require('./API/routes/Brand');
const Condition = require('./API/routes/Condtion');
const User = require('./API/routes/User');


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})


mongoose.connect('YOUR CONNECTION STRING',
{ useNewUrlParser: true })
.catch(err=>console.log('Error while connection db', err))


const PORT=8080;
app.use(bodyparser.json());



//middleware for author
app.use('/product',Product);
app.use('/category',Category);
app.use('/brand',Brand);
app.use('/condition', Condition);
app.use('/user', User);
app.get('/',(req, res)=>{
    return res.json({name:'tabish'})
})




app.listen(PORT,()=>console.log(`API waiting at port ${PORT}`));