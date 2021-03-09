const express = require('express');
const Product  = require('../../models/Product');
const Category = require('../../models/Categories');
const Brand = require('../../models/Brand');
const mongoose = require('mongoose');



const router = express.Router();

router.get('/',(req, res)=>{
    Product.find(req.query)
    .populate("brandId conditionId")
    .then(records=>res.status(200).json(records))
    .catch(error=>res.status(500).json({error: 'error while getting record'}))
})

router.get('/detail', (req, res)=>{
    console.log('on detail')
    Product.findOne({_id:req.query._id})
    .populate("brandId conditionId")
    .then(records=>res.status(200).json(records))
    .catch(error=>res.status(500).json({error: 'error while getting record'}))
})


router.post('/', async (req, res)=>{
    const {title, price, description,
        imageUrl,
         brandId, conditionId, mainCatId, subCatId} = req.body;


    const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl,
            brandId: brandId,
            conditionId: conditionId
    });

    console.log(product);

    product.save()
        .then(async (record) => {
            //push product id into category document for reference
            const category = await Category.exists({_id: mainCatId});
            if (category){
                Category.findOne({_id: mainCatId})
                .then(category=>{
                    subCategory = category.sub_categories.id(subCatId);
                    subCategory.products.push(product._id);
                    //save main document that is category
                    category.save()
                        .then(data=>res.status(201).json({status: true, message: `${title} added.`}))
                        .catch(error=>res.status(500).json({error: error}))
                })
                
            }// end if
        })
        .catch(error => res.status(500).json(error))



    
})


// router.delete('/', (req, res)=>{
//     Product.deleteMany()
//     .then(data=>res.json(data))
//     .catch(error => res.j    son(error));

// })



module.exports = router;