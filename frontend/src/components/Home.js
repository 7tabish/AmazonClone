import Product from './Product';
import ShopByCategory  from './ShopByCategory';
import Footer from './Footer';
import './Home.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Products from './Admin/Products';
import {Link} from 'react-router-dom';


const Home =()=>{
    const [loadedMainCategories, setLoadedMainCategories] = useState([]);

    useEffect(()=>{
        loadMainCategories();
    },[])

    const loadMainCategories = ()=>{
        axios.get('http://localhost:8080/category')
        .then(response=>{
    
            setLoadedMainCategories(response.data);

        })
        .catch(error=>console.log(error))
      }

    const showProductListings = (categoryId)=>{

    }

    return(
        <div className="home">
            <div className="home__container">
                <img
                className="home__image" 
                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
                />
   
                <div className="home__row">
                <ShopByCategory/>
                    {loadedMainCategories.length>0?
                    loadedMainCategories.map(category=>{
                        return (
                        
                            <Product title = {category.main_category}
                            image_url = {category.main_imageUrl}
                            _id = {category._id}
                            onClickHandler = {()=>showProductListings(category._id)}/>
                    
                        )
                    }):
                    <h3>Loading</h3>
                }
                </div>
            </div>
        </div>
    )
}

export default Home;