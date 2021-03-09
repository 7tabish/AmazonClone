import './CheckoutProduct.css';
import {useStateValue} from '../reducer/StateProvider';
import { useEffect } from 'react';

const CheckoutProduct = (props) =>{
    const {id, title, price, imageUrl, quantity, onRemoveHandler, totalPrice} = props;
    
    const [{basket}, dispatch] = useStateValue();


    return(
        <div className='checkout__product' key={id}>
            <div className='checkout__image'>
            <img
            src={imageUrl}
            />
            </div>
            <div className='checkout__info'>
            <h4>{title}</h4>
            <p>$ {price}</p>
            <p><b>Quantity:</b> {quantity}  <b>Total Price:</b> $ {totalPrice}</p>

            <button onClick={onRemoveHandler}>remove from cart</button>
          </div>
            </div>
    )
}

export default CheckoutProduct;