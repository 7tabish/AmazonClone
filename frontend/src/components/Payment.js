import './payment.css';
import {useStateValue} from '../reducer/StateProvider';
import { useHistory } from 'react-router-dom';
import {useState} from 'react';

import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {  
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
  
  
  }));


const Payment =()=>{    
    const [{basket}, dispatch] = useStateValue();
    let history = useHistory();
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [logs, setLogs] = useState('');

    const submitShipDetails = (e)=>{
      e.preventDefault();
      if (address==='' || postalCode==='' || city==='' || country===''){
        setLogs('All fields are required');
      }
      else{
        createOrder();
      }
    }

    const createOrder = ()=>{
      const token =  localStorage.getItem('token');
      
      const data = {
        token: token,
          orderedProducts: basket,
          address: {
            city: city,
            country: country,
            postalCode: postalCode,
            street: address
          }
      }

      const url = 'http://localhost:8080/user/createOrder';
     
      axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response =>{
        if(response.status===201){
          localStorage.removeItem('basketProducts');
          dispatch({
            type: "REMOVE_BASKET",
          });
          history.push('orders');
        }
      })
      .catch(error => setLogs('Error while ordering !'));
    
    }

    const classes = useStyles();
    return(
        <div>
        {basket.length===0?<h2>No product in your basket. Go and find some 
             <span style={{color:'coral'}} onClick={()=>history.push('/')}> stuff</span> here</h2>
        :
        <div className='shipping__details'>
            <h2>Add shipping details</h2>
            {logs ? <p style={{color:'red'}}><b>{logs}</b></p> : null}
            <form className={classes.root}>
                <TextField id="outlined-basic"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                label="Address" variant="outlined" />

              <TextField id="outlined-basic"
                value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}
                label="Postal code" variant="outlined" />

            <TextField id="outlined-basic"
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                label="City" variant="outlined" />

            <TextField id="outlined-basic"
                value={country}
                onChange={(e)=>setCountry(e.target.value)}
                label="Country" variant="outlined" />

            <Button
            onClick = {e=>submitShipDetails(e)}
              size='large'
              type='submit'
              style={{width:'120px',padding: '5px'}}
              variant="contained" color="secondary">
                
              Make order
            </Button>
            </form>
        </div>
            }
        </div>

    )
}

export default Payment