const express = require('express');
const Product  = require('../../models/Product');
const mongoose = require('mongoose');


const router = express.Router();

router.post('/', (req, res)=>{
    
    const { main_category, sub_category } = req.body;
    
    if (main_category==='' || sub_category===''){
        return res.status(500)
        .json({message:'main_category and sub_category are required'})
    } 

    Product.exists({'main_category': main_category}, (err, result)=>{
        if (err){
            return res.status(501).json({error:err})
        }
        if (result){
            let sub_category_obj = {
                _id:  new mongoose.Types.ObjectId(),
                name: sub_category,
            }

  
            Product.updateOne({main_category: main_category},
                { $push: { sub_categories: sub_category_obj } },
                (err, result)=>{
                    if (err){
                        return res.json({error:`Error while saving sub category. ${err}`})
                    }

                    if (result){
                        return res.status(201).json({message:'add new subcategory',sub_category: sub_category})
                    }
                })
        }
        else{
            return res.json({error: `main category:${main_category} not exists`})
        }

    })
})

router.get('/', (req, res)=>{

    if (req.query.main_category){

        Product.findOne({main_category: req.query.main_category})
        .select('-_id sub_categories.name')
        .then(result=>{
            return res.status(200).json(result)
        })
        .catch(error => res.status(500).json({error:error}))
    }//end if 

    else{
        Product.find()
        .select('main_category -_id sub_categories.name')
        .then(result=>{
            return res.status(200).json(result)
        })
        .catch(error => res.status(500).json({error:error}))
    }


})


router.delete('/', (req, res)=>{
    const {main_category, sub_category} = req.query;
    
    if (main_category===undefined || sub_category===undefined){
        return res.json({error:'main_category and sub_categories are required'})
    }
    
    Product.find({main_category:main_category},
            { $pull: { sub_categories: {name: sub_category}} },
                (err, updatedRecord)=>{
                    if (updatedRecord){
                        return res.json({message:'deleted', sub_category: sub_category})
                        }
                    console.log(err);
                    console.log(updatedRecord);
                    return res.json({error:`no subcategory found with name ${sub_category}`})
                    })//end callback
        
    .catch(error=>res.json({error:error}))

})



module.exports = router;