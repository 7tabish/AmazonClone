import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import AdminHome from './components/Admin/home';
import Payment from './components/Payment';
import Orders from './components/Orders';

import {BrowserRouter as Ruoter, Switch, Route} from 'react-router-dom';
import Checkout from './components/Checkout';
import {useEffect} from 'react';
import {useStateValue} from './reducer/StateProvider';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import History from './components/History';
import './App.css';


function App() {
  const [{user}, dispatch] = useStateValue();
  useEffect(()=>{
    document.title='amazon'
  },[])
  
  return (
    <>
      
    <Ruoter History={History}>
    <Header/>
      <Switch>

      <Route path = '/admin' component={AdminHome}/>
      
      
      <Route path = '/checkout'  component={Checkout}/>
      
      <Route path = '/login' component={Login}/>

      <Route path = '/detail' component={ProductDetail}/>

      <Route path = '/payment' component={Payment}/>

      <Route path = '/productList' component={ProductList}/>
      <Route path = '/orders' component = {Orders}/>
        <Route  exact path='/'  component={Home} />
        {/* <Header/> */}
        


      
      </Switch>
    </Ruoter>
    </>
  );
}

export default App;
