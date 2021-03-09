import MenuBar from './MenuBar';
import Brand from './Brands';
import Condition from './Condition';
import Categories from './Categories';
import Products from './Products';
import ProductDataTable from './ProductDataTable';

import './Home.css';
import {useState} from 'react';


const Home =()=>{
    const [currentMenu, setCurrentMenu] = useState('');

    const handleMenuItemClick =(menuItem)=>{
        console.log(menuItem);
        setCurrentMenu(menuItem);
    }

    return(

        <div className='adminHome'>
            <div className = 'adminHome__left'>
                <MenuBar
                handleClick = {handleMenuItemClick}/>
            </div>

            <div className = 'adminHome__right'>
                {currentMenu==='Brands' ? <Brand/>:null}
                {currentMenu==='Conditions' ? <Condition/>:null}
                {currentMenu==='Categories' ? <Categories/>:null}
                {currentMenu==='Products' ? <Products/> :null}
    
            </div>
        </div>
    );
}

export default Home;