const express = require('express');
const User  = require('../../models/User');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require('express');
const CheckAuth = require('../middlewares/check-auth');

const router = express.Router();

router.post("/signup", (req, res) => {
    const { email, password} = req.body;
    if ( email===undefined || password===undefined){
        return res.status(500).json({error:'all fields are required'})
    }

    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: `Account already exists with ${req.body.email}`
          });
        } else {
    
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: `new account created with ${req.body.email}`
                  });
                })
                .catch(err => {
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });

  router.post("/login", (req, res) => {

      const {email, password} = req.body;
      if (email===undefined || password===undefined){
          return res.status(500).json({error: "all fields are required"});
      }
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
    
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              "MYSECRETKEY",
              // {
              //     expiresIn: "1h"
              // }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.post('/createOrder',CheckAuth,(req, res)=>{
    const {userData} = req;
    const {orderedProducts, address} = req.body;
    
   
    User.findOne({_id:userData.userId})
    .then(foundedUser=>{
      orderedProducts.map(product=>{
        const userOrderObject = {
          product: product._id,
          quantity:product.quantity,
          price: product.price,
          address:address
        }
          foundedUser.orders.push(userOrderObject);
    
      });
        
      foundedUser.save()
      .then(orderSave=>res.status(201).json({message: 'Order Created'}))
      .catch(error=>res.status(500).json(error))
      
    })
    .catch(error=>res.status(500).json(error))
   
  })

  router.get('/getOrders', CheckAuth, (req, res)=>{
    const {userData} = req;
    User.findOne({_id: userData.userId})
    .populate({
      path: 'orders',
      populate:{
          path: 'product',
          model: 'Product'
      }
  })
    .then(userRecord => userRecord.orders)
    .then(orders=>res.status(200).json({orders}))
    .catch(error=>res.status(500).json(error))
  })


module.exports = router;