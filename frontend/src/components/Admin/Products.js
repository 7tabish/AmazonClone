import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import ProductDataTable from './ProductDataTable';
import DropDownMenu from './DropDownMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {  
      margin: theme.spacing(1),
      width: '50ch',
    },
  },


}));

const Products =()=>{
  const [brands, setBrands] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [condition, setCondition] = useState([])

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedMainCategry, setSelectedMainCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productDescription, setProductDescription] = useState('');


  useEffect(()=>{
    loadMainCategories();
    laodConditions();
    laodbrands();
  }, [])



  const loadMainCategories = ()=>{
    axios.get('http://localhost:8080/category')
    .then(response=>{
      response.data.map(data=>{
        setCategory(category=>[...category,{name: data.main_category,_id:data._id}]);
      })
    })
    .catch(error=>console.log(error))
  }

  const loadSubcategories = (event)=>{
    
      axios({
        method: 'get',
        url: `http://localhost:8080/category/subcategories?mainCategoryId=${event.target.value}`,
      })
      .then(response=>{
        console.log('sub category are ',response.data);
        setSubCategory(response.data);
      })
      .catch(error=>console.log(error))
  }
  

  const laodConditions =()=>{
    
    axios.get('http://localhost:8080/condition')
    .then(response=>{
      setCondition(response.data);
    })
    .catch(error=>console.log(error))
}

const laodbrands =()=>{
  axios.get('http://localhost:8080/brand')
  .then(response=>{
    setBrands(response.data);
  })
  .catch(error=>console.log(error))
}



const submitConditionHandler = event=>{
  event.preventDefault();
  if(productName ==='' ||  productPrice ==='' || productDescription === ''
  || selectedMainCategry === '' || selectedSubCategory === '',selectedBrand ==='' || productImageUrl===''){
    alert('All fields are required')
  }

  axios({
      method: 'post',
      url: 'http://localhost:8080/product',
      data:{
        title: productName,
        price: productPrice,
        description: productDescription,
        imageUrl: productImageUrl,
        brandId: selectedBrand,
        conditionId: selectedCondition,
        mainCatId: selectedMainCategry,
        subCatId: selectedSubCategory
      }
    })
    .then(response=>{
        
        if (response.data.error){
            console.log('Error => ', response.data.error);
        }

        if (response.data.status===true){
          console.log('true status ',response);
        }
        
    })
    .catch(error=>console.log('catch error ',error));
  };


  const classes = useStyles();

    return(
      
        <div className='product__admin'>
        
        <h2>Add a new Product</h2>
        
        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e)=>submitConditionHandler(e)}>
          
          <DropDownMenu name='Main Category' valueArray={category} 
          currState ={selectedMainCategry}
          setState = {setSelectedMainCategory}
          onSelectHandler = {(e)=>loadSubcategories(e)}
          />

            <DropDownMenu name='Sub category' valueArray={subCategory} 
            currState ={selectedSubCategory}
            setState = {setSelectedSubCategory}
            onSelectHandler = {null}/>
    
    

        <DropDownMenu name='Brands' valueArray={brands} 
        currState ={selectedBrand}
        setState = {setSelectedBrand}
        onSelectHandler={null}/>

        <DropDownMenu name='Condition' valueArray={condition} 
        currState ={selectedCondition}
        setState = {setSelectedCondition}
        onSelectHandler={null}/>
        


       
              <TextField id="outlined-basic" value={productName}
               onChange={(e)=>setProductName(e.target.value)}
               label="Title" variant="outlined" />

              <TextField id="outlined-basic" value={productPrice}
              onChange={(e)=>setProductPrice(e.target.value)}
               label="Price" variant="outlined" />
              
              <TextField id="outlined-basic" value={productImageUrl}
              onChange={(e)=>setProductImageUrl(e.target.value)}
               label="Image url" variant="outlined" />
              
              <TextField id="outlined-basic" value = {productDescription}
              onChange={(e)=>setProductDescription(e.target.value)}
              label="Description"
              multiline
              rows={8}
              style={{minWidth: '80%'}}
              variant="outlined" />
              <br/>

             <Button
              size='small'
              type='submit'
              style={{width:'120px',padding: '5px'}}
              variant="contained" color="primary">
              Add Product
            </Button>
        
        </form>
        
          <h2>Products in your store</h2>
            
        </div> 
    )
}
export default Products;
