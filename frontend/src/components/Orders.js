import './Login.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateValue } from '../reducer/StateProvider';
import './Orders.css';


const Orders = ()=>{
      
  const [{basket, user}, dispatch] = useStateValue();

  const [orders, setOrders] = useState([]);
  
    useEffect(()=>{
        if(localStorage.getItem('token')){
          getOrders();
        }      
    }, [])

    

    const getOrders = ()=>{
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8080/user/getOrders', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response =>{
          
            setOrders(response.data.orders);
          })
          .catch(error => console.log(error));
    }

    const toFix=(totalPrice)=>{
      return totalPrice.toFixed(2);
    }

    return(
        <div>
        
        {user ? 
      
          <div className="orders">
            <h2>Your orders</h2>

              
            
            {orders.map(order=>{
              return(
                <>
                <div className='orderDetailBlock'>
                  
            
                  
                  <h4>{order.product.title}</h4>
                  <div className='orderRow2'>
                    <div className='productPricing'>
                    <h4 id='detailHead'>Pricing</h4>
                    <span className='detailAttributes'><b>Price: </b>${order.price}</span>
                    <span className='detailAttributes'><b>quantity: </b>{order.quantity}</span>
                    <span className='detailAttributes'><b>Total: </b>${toFix(order.price * order.quantity)}</span>                       
                    </div>
                  
                  <div className='shippingDetails'>
                    <h4 id='detailHead'>Address Details</h4>
                    <span className='detailAttributes'><b>Street: </b>{order.address.street}</span>
                    <span className='detailAttributes'><b>City: </b>{order.address.city}</span>
                    <span className='detailAttributes'><b>Country: </b>{order.address.country}</span>
                    <span className='detailAttributes'><b>Postal Code: </b>{order.address.postalCode}</span>
                  </div>
                </div>
                </div>
                </>
              )
            })}
            
          </div>
        :
        <h3>You need to login to view this page. Login here</h3>
        }
        </div>
    )
    
}

export default Orders;