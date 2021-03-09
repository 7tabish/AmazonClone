import ProductDetail from "./ProductDetail"
import ProductCard from './ProductCard';
import './ProductList.css';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {useLocation, useHistory} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';



const ProductList = ({location})=>{

    let history = useHistory();
   
    const [products, setproducts] = useState([]);

    const [subCategories, setSubCategories] = useState([]);
    const [priceRanges, setpriceRanges] = useState([
        'Under 25$', '25$ to 50$',
         '50$ to 100$', '100$ or more'
    ])
    const [loadedConditions, setLoadedConditions] = useState([])
    
    //main category get from url
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    //filtered conditions
    const [filterSubCategory, setFilterSubCategory] = useState('');
    const [filterPrice, setFilterPrice] = useState('');

    const [recordFound, setRecordFound] = useState(null);



    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const categoryId = params.get('categoryId');
        setSelectedCategoryId(categoryId);
        laodConditions();
    },[]);

    useEffect(()=>{
        if (selectedCategoryId!==''){
            loadSpecificProducts();
        }
        
    }, [selectedCategoryId])

    //run when we change the subCategory filter
    useEffect(()=>{
        if(filterSubCategory!==''){
        const url = `http://localhost:8080/category/products?category=${selectedCategoryId}&subCategory=${filterSubCategory}`;
        callFitlerApi(url);
        }
        
    }, [filterSubCategory])

    //run when we change the price filter
    useEffect(()=>{
        if(filterPrice!==''){
            const url = `http://localhost:8080/category/products?category=${selectedCategoryId}&subCategory=${filterSubCategory}&price=${filterPrice}`
            callFitlerApi(url);
        }
    }, [filterPrice])

    const laodConditions =()=>{
        axios.get('http://localhost:8080/condition')
        .then(response=>{
            setLoadedConditions(response.data);
        })
        .catch(error=>console.log(error))
    }

    //load only once when page is refresh
    const loadSpecificProducts =()=>{
        //send a category ID
        axios.get(`http://localhost:8080/category/products?category=${selectedCategoryId}`)
        .then(products=>{
            
            if(products.data.sub_categories){
                
                products.data.sub_categories.map(sub_category=>{
                    setSubCategories(subCategory=>[...subCategory, sub_category])
                    sub_category.products.map(productData=>{
                        setproducts(product=>[...product, productData]);
                    })       
                })
            }
           else{
                setRecordFound(false);
           }
          
        })
        .catch(error=>console.log(error))
    }

    const handleConditionFilter =(conditionId)=>{
        setFilterSubCategory(conditionId);
    }

    const handlePriceFilter = (filterPriceCondition)=>{
        setFilterPrice(filterPriceCondition);
    }

    const callFitlerApi = url=>{
        setproducts([]);
        setRecordFound(null);
        axios.get(url)
        .then(products=>{
            if(products.data.sub_categories[0].products.length>0){
                    products.data.sub_categories[0].products.map(productData=>{
                        setproducts(product=>[...product, productData]);
                    })       
                
            }
           else{
                setRecordFound(false);
           }
        })
        .catch(err=>console.error(err))
    }


    const handleProductClick = (productId)=>{
        history.push(`detail?productId=${productId}`)
    }

    return(
        <>
 
        <div className='productList'>
            <div className='productList__left__filter'>
                <div className='productList__subCategories'>
                    <h4 className='productList__heading'>Sub categories</h4>
            
                    {subCategories.length>0?
                    subCategories.map(subCategory=>{
                        return <p onClick={()=>handleConditionFilter(subCategory._id)}>{subCategory.name}</p>
                    })
                    :<img className = 'loading_gif'
                    src='https://i.gifer.com/4V0b.gif'/>
                }
                </div>
            
                <div className='productList__price'>
                    <h4 className='productList__heading'>Price</h4>
                    {priceRanges.map(priceRange =>(
                         <p onClick = {()=>handlePriceFilter(priceRange)}>
                             {priceRange}
                        </p>
                    )
                    )}
                </div>

                <div className='productList__condition'>
                    <h4 className='productList__heading'>Condition</h4>
                    {
                    loadedConditions.length>0?
                    loadedConditions.map(condition =>(
                         <p onClick = {()=> handleConditionFilter(condition._id)}>{condition.name}</p>
                         )
                    )
                    :<img className = 'loading_gif'
                    src='https://i.gifer.com/4V0b.gif'/>
                    }
                    
                </div>
            </div>{/* close left filter */}

        {recordFound===false ? <h3>No product found</h3> : 
        <div className = 'productList__right__filter'>

            {products.length>0?
            products.map(product=>{
                return (
                <ProductCard
                        title = {product.title}
                        image_url = {product.imageUrl}
                        price = {product.price}
                        _id = {product._id}
                        onClickHandler = {()=>handleProductClick(product._id)}
                        />
                )
            })
            :<img className = 'loading_gif'
            src='https://i.gifer.com/4V0b.gif'/>
            }
    
        </div>
}
        
        </div>
        </>
    )
}

export default ProductList;