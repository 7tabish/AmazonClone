import '../components/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link, useHistory} from 'react-router-dom';
import {useStateValue} from "../reducer/StateProvider";
import Login from './Login';
import { useEffect, useState } from 'react';


const Header = ()=> {
  let history = useHistory();

  const token = localStorage.getItem('token');
  const loginEmail = localStorage.getItem('loginEmail');


  // const [token, setToken] = useState(locToken)
  // const [loginEmail, setLoginEmail] = useState(locEmail)
  
  const [{basket, user}, dispatch] = useStateValue();
  


  const addUser = (email, token)=>{
    dispatch({
        type: "SET_USER",
        user: {
            email: email,
            token: token
        }
  });
  }//end addUser

  const removeUser = ()=>{
    dispatch({
      type: "SET_USER",
      user:null
    });
  }

  //its purpose is to set values from local storage to react context api
  useEffect(()=>{
 
    if (loginEmail!==null && token!==null){
      addUser(loginEmail, token);
    }
    if (localStorage.getItem('basketProducts')){
      //set data in context api while refresing if data found in local storage

      //fetch data from local storage
      let basketFromLocalStorage = localStorage.getItem('basketProducts');
      basketFromLocalStorage = JSON.parse(basketFromLocalStorage);
 
      //add data to context state from localstorage
      basketFromLocalStorage.map(productInfo=>{
        addToBasket(productInfo);
      })
    }
  }, [])

  useEffect(()=>{
    //run when new product add to cart

      console.log('need to update basket in local storage', basket)
      localStorage.setItem('basketProducts', JSON.stringify(basket));
  
    
  }, [basket])

  const addToBasket =(productInfo)=>{
    dispatch({
        type: 'ADD_TO_BASKET',
        item:productInfo
    })
}
  const handleAuth =()=>{
  
    if(user){

      localStorage.removeItem('token');
      localStorage.removeItem('loginEmail'); 
      removeUser()   
      history.push('/');
    }
    else{
      history.push('login');
    }
  
  }

    return (
      <div className="header">
        <Link to = '/'>
          <img className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          />
        </Link>

        <div className="header__search">
          <input className="header_searchInput"
          type="text"
          />
  
          <SearchIcon
          className="header__searchIcon"
          />

        </div>

        <div className="header__nav">

        
          <div className="header__option" onClick={()=>handleAuth()}>
            <span className="header__optionLineOne">
              {user ? user.email : 'Hello Guest'}
            </span>
            <span className="header__optionLineTwo">
            {user ? 'sign out' : 'sign in'}
            </span>
          </div>
       

          <div className="header__option">
            <span className="header__optionLineOne">
              Returns
            </span>
            <span className="header__optionLineTwo">
              Orders         
            </span>
          </div>


          <div className="header__optionBasket">
            <Link to='/checkout'>
              <ShoppingBasketIcon/>
            </Link>
            <span className="header__optionLineTwo
            header__basketCount">{basket?.length}</span>
          </div>

        </div>
      </div>
    );
  }
  
  export default Header;
  