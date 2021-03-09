const express = require('express');
const Brand  = require('../../models/Brand');
const mongoose = require('mongoose');


const router = express.Router();

router.get('/', (req, res)=>{
    Brand.find()
    .then(data=> res.status(200).json(data))
    .catch(error=>res.json({error: error}))
});

router.post('/', (req, res)=>{
    const { brandName } = req.body;

    const brand = new Brand({
        _id: new mongoose.Types.ObjectId(),
        name: brandName
    });

    Brand.exists({name: brandName})
    .then(status=>{
        if(status){
            return res.json({error: `Brand with name ${brandName} already exists`})
        }
        else{
            brand.save()
            .then(brand => res.json({status: true, message: brand}))
            .catch(error=>res.json({error:error}))
        }
    })
});

router.delete('/', (req, res)=>{
    const {brandId} = req.body;

    Brand.findByIdAndDelete(brandId)
    .then(brand=>res.json(brand))
    .catch(error=>res.status(500).json(error))
})


module.exports = router;
