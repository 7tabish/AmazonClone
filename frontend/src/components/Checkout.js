import CheckoutProduct from './CheckoutProduct';
import Order from './Orders';
import './Checkout.css';

import {useStateValue} from '../reducer/StateProvider';
import {getBasketTotal} from '../reducer/reducer';
import {useHistory} from 'react-router-dom';
import { useEffect } from 'react';


const Checkout = ()=>{
    let history = useHistory();
    const [{basket, user}, dispatch] = useStateValue();

    const doCheckOut =()=>{
        
        if(!user){
            history.push('login')
        }
        else{
            history.push('payment')
        }
        
    }

    const removeItemFromBasket = (productId)=>{
        dispatch({
            type: "REMOVE_FROM_CART",
            id: productId
    });
    }


    return(
        <div className='checkout'>
            <div className='checkout__left'>
            <h3>Your shopping items are here !</h3>
             
                {
                    basket.map(item=>{
                        return(
                            <CheckoutProduct
                            id = {item._id}
                            title = {item.title}
                            price = {item.price}
                            imageUrl = {item.imageUrl}
                            quantity = {item.quantity}
                            totalPrice = {item.totalPrice}
                            onRemoveHandler = {()=>removeItemFromBasket(item._id)}
                            />
                        )
                    })
                }
            
            </div>

            <div className='checkout__right'>
                <p><small>your total items ({basket?.length})</small>  <strong>$ {getBasketTotal(basket)}</strong></p>
                <button onClick={()=>doCheckOut()}>checkout</button>
            </div>
    
        </div>
    
    );
}

export default Checkout