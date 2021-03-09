const express = require('express');
const Category  = require('../../models/Categories');
const mongoose = require('mongoose');
const  checkAuth = require('../middlewares/check-auth');

const router = express.Router();

//return list of all main categories

router.get('/', (req, res)=>{
    Category.find()
    .select('main_category main_imageUrl')
    .then(data =>{
        return res.status(200).json(data);
    })
    .catch(error => res.json({error:error}))
})


router.get('/testProducts', (req, res)=>{

    Category.find({'sub_categories.name':'Home Decor'})
    .populate({
        path: 'sub_categories',
        populate:{
            path: 'products',
            model: 'Product'
        }
    })
    .then(data=>{
        console.log(typeOf(data));
        res.status(200).json(data);
    })
    .catch(error=>res.json(error))
})



//return a specific main category with sub category and products
router.get('/products', (req, res)=>{
    let priceFilter = {};
    let subCategoryFilter= {};

    const {category, subCategory, price} = req.query
    // let filterQuery;
    // filterQuery = {_id: req.query.category};
    // if(subCategory){
    //     filterQuery["sub_categories._id"] = subCategory;
    // }
    console.log('price ', price);
   

    if (subCategory){
        subCategoryFilter = {sub_categories:{$elemMatch: {_id: subCategory}}}
    }
    if(price){
        if(price==='Under 25$'){
            priceFilter = {price: {$lte:25}};
        }
        else if(price==='25$ to 50$'){
            priceFilter = {price: {$gte: 25, $lte:50}};
        }
        else if(price==='50$ to 100$'){
            priceFilter = {price: {$gte: 50, $lte:100}};
        }
        else if(price==='100$ or more'){
            priceFilter = {price: {$gte: 100}};
        }
         
    }

    Category.findOne({
        _id: req.query.category,
      })
    .select(subCategoryFilter)
    .populate({
        path: 'sub_categories',
        model: 'Category',
    
        populate:{
            path: 'products',
            model: 'Product',
            match: priceFilter,
            populate:[
                {
                    path: 'conditionId',
                    model: 'Condition',
                    // match: {_id: '603e56602b626446481667e6'}
                }
            ]
        }
    })
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(error=>res.json(error))
})

//return list of all subcategories under a specfic main category
router.get('/subcategories', (req, res)=>{

    const { mainCategoryId } = req.query;

    
    Category.findOne({_id: mainCategoryId})
    .then(data=>{
        res.status(200).json(data.sub_categories);
        
    })
    .catch(error=> {
        return res.json([]);   
        })
    
    
})


router.post('/', (req, res)=>{
    const { categoryName, imageUrl } = req.body;
    console.log('=> ', imageUrl);
    if (categoryName===undefined){
        return res.json({error:'category field is required'})
    }

    Category.exists({'main_category': categoryName}, (err, result)=>{
        if (err){
            return res.status(500).json({error:err})
        }
        if (result){
            return res.json({error: `main category ${categoryName} already exists`})
        }
        else{
            const category = new Category({
                _id: new mongoose.Types.ObjectId(),
                main_category: categoryName,
                main_imageUrl: imageUrl
            });
            category.save()
            .then(response=>{
                 return res.status(201).json({status:true,message:response})
                
            })
            .catch(err => console.error('Error while adding new main category ',err))
        }

    })
})


router.post('/createSubCategory', async (req, res)=>{
    const {mainCategory, subCategory} = req.body;
    
    if (mainCategory===undefined || subCategory===undefined){
        return res.json({error:'category field is required'})
    }

    Category.findOne({main_category: mainCategory})
    .then(foundedMainCategory=>{
        Category.findOne({'sub_categories.name': subCategory})
                .then(newSubCategory=>{
                    if (newSubCategory===null){
                        const _id = new mongoose.Types.ObjectId()
                        subCategory_obj = {_id: _id, name: subCategory}
                        foundedMainCategory.sub_categories.push(subCategory_obj);
                        foundedMainCategory.save();
                        return res.status(201).json({status:true, message: `${subCategory} save under ${mainCategory}`})
                    }
                    else{
                        return res.json({error: 'Subcategory already exists'})
                    }
                
                })
    })
    .catch(error=>{
        console.log('eror found ',error)
        return res.json({error:error})
    })

})


module.exports = router;