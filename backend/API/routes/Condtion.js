const express = require('express');
const Condition  = require('../../models/Condition');
const mongoose = require('mongoose');
const Product  = require('../../models/Product');

const router = express.Router();

router.get('/', (req, res)=>{
    Condition.find()
    .then(data=>{
        if (data.length===0){
            return res.status(404).json({message: 'no record found'})
        }
        else{
            return res.status(200).json(data)
        }

    })
    .catch(error=>res.json({error: error}))
});



router.post('/', (req, res)=>{
    const { conditionName } = req.body;
 

    const condition = new Condition({
        _id: new mongoose.Types.ObjectId(),
        name: conditionName
    });

    Condition.exists({name: conditionName})
    .then(status=>{
        if(status){
            return res.json({error: `Condition with name ${conditionName} already exists`})
        }
        else{
            condition.save()
            .then(saveRecord => res.json({status: true,message: saveRecord}))
            .catch(error=>res.json({error:error}))        
        }
    })
    

});

router.delete('/', (req, res)=>{
    const {conditionId} = req.body;

    Condition.findByIdAndDelete(conditionId)
    .then(condition=>{

        //remove product with that condition ID
        Product.deleteMany({conditionId: conditionId})
        .then(removedProducts=>console.log(removedProducts))

        return res.json({status:true, message: 'condition and their products have been deleted !'})
    })
    .catch(error=>res.status(500).json(error))
})

    

module.exports = router;
