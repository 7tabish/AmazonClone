import './ProductDetail.css';
import {useStateValue} from '../reducer/StateProvider';

import axios from 'axios';
import {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

const ProductDetail = ({location})=>{

    const [selectedProductId, setSelectedProductId] = useState('')
    const [product, setProduct] = useState(null);
    const [recordFound, setRecordFound] = useState(null);

    const {productId} = useLocation()
    const [{basket}, dispatch] = useStateValue();

    const [maxProdQuantity, setMaxProdQuantity] = useState([1,2,3,4,5])
    const [selectedQuantity, setSelectedQuantity] = useState(1);


    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const productId = params.get('productId');
        setSelectedProductId(productId);
    },[])

    useEffect(()=>{
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket])
    
    useEffect(()=>{
        if(selectedProductId!==''){
            getProduct();
        }
    },[selectedProductId])

    const getProduct =()=>{
        axios.get(`http://localhost:8080/product/detail?_id=${selectedProductId}`)
        .then(product=>{
            if (product.data){
                setProduct(product.data);
                setRecordFound(true);
            }
            else{
                setRecordFound(false);
            }
            
        })
        .catch(error=>setRecordFound(false))
    }

    const addToBasket =(productInfo)=>{
        productInfo.quantity = selectedQuantity;
        productInfo.totalPrice = productInfo.price * productInfo.quantity
        
        if(isBasketContainData(productInfo)){
            alert('Product already in cart')
        }
        else{
            dispatch({
            type: 'ADD_TO_BASKET',
            item:productInfo
        })
        }
    }

    const isBasketContainData =(productInfo)=>{
        if(basket.length > 0){
            var i;
            for (i = 0; i < 1; i++) {
                if (basket[i]._id === productInfo._id) {
                    return true;
                }
            }
        }
    
        return false;
    }

    return(
        <>
        {recordFound==false ? <h1>No record found</h1>:
        <div className='productDetail'>
            {product!==null?
        <div className = 'productDetail__row'>
            <div className='produtDetail__image'>
                <img
                src = {product.imageUrl}/>
            </div>

            <div className='produtDetail__info'>
                <div className = 'productDetail__info__section'>
                    <h3>{product.title}</h3>
                    <p>Price: <span className='price'>$ {product.price}</span></p>
                    <div className = 'tags'>
                        <p>{product.conditionId.name}</p>
                        <p>{product.brandId.name}</p>
                    </div>
                </div>


                <div className = 'productDetail__info__section'>
                    <h3>About this item</h3>
                    <p id = 'productDetail__description'>{product.description}</p>
                    
                </div>
                
             

            </div>

            <div className='produtDetail__checkout'>
                <button onClick={()=>addToBasket(product)}>Add to cart</button>
                <label>Quantity</label>

                <select name="quantity" id="quantity" onChange={(e)=>setSelectedQuantity(e.target.value)}>
                    {maxProdQuantity.map(quantity=>{
                        return(
                            <option>{quantity}</option> 
                        )
                       
                    })}
                </select>

            </div>

        </div>
        :<h3>Loading</h3>}
        </div>
}
        </>
    );
}

export default ProductDetail;