import './Login.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useStateValue } from '../reducer/StateProvider';

const Login =()=>{
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logs, setLogs] = useState('');
    const [{basket}, dispatch] = useStateValue();
    
    const addUser = (email, token)=>{
        dispatch({
            type: "SET_USER",
            user: {
                email: email,
                token: token
            }
    });
}//end addUser

const loginHandler = (e)=>{
    e.preventDefault();
    axios({
        method: 'post',
        url: 'http://localhost:8080/user/login',
        data:{
          email: email,
          password: password
        }
      })
      .then(response=>{
          if (response.status===200){
              localStorage.setItem('loginEmail', email);
              localStorage.setItem('token',response.data.token);
              addUser(email, response.data.token)

              if (basket.length > 0){
                  history.push('checkout')
              }
              else{
                history.push('/');
              }
              
          }     
      })
      .catch(error=>{
        
        if (error.response.status===401){
            setLogs(error.response.data.message);
        }
        else{
            setLogs('server error !');
        }   
      });
}

const signUpHandler = (e)=>{
    e.preventDefault();
    axios({
        method: 'post',
        url: 'http://localhost:8080/user/signup',
        data:{
          email: email,
          password: password
        }
      })
      .then(response=>{
          if (response.status===201){
              setLogs(response.data.message);
          }     
      })
      .catch(error=>{
        
        if (error.response.status===409){
            setLogs(error.response.data.message);
        }
        else{
            setLogs('server error !');
        }   
      });
}

    return(
        <div className='login'>
              <bold>{logs!=='' ? `${logs}`:null}</bold>
            
            <form>
            <h3>
                User Authentication
            </h3>
                <label>Email</label>
                <input value = {email}
                required
                onChange = {(e)=> setEmail(e.target.value)}
                type='text'/>

                <label>Password</label>
                <input value = {password}
                required
                onChange = {(e)=> setPassword(e.target.value)}
                type='password' />

                <button 
                type = 'submit'
                id='loginButton'
                onClick={(e)=>loginHandler(e)}  >Login</button>

                <button
                type = 'submit'
                id = 'signupButton'
                onClick = {(e)=>signUpHandler(e)}>
                    Create a new account</button>
            </form>   
        </div>
    );
}

export default Login;