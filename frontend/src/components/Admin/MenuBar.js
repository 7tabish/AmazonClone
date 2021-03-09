import './MenuBar.css';
import {useState} from 'react';

const MenuBar = (props)=>{
    const {handleClick} = props;
    
    const [menuItems, setMenuItems] = useState([
        'Products', 'Brands', 'Conditions', 'Categories'
    ]);
    
    return(
        <div className='menuBar'>
            {menuItems.map(menuItem=>{
                    return(
                        <div className='menuBar__items'
                        onClick={()=>handleClick(menuItem)}>
                        <p>{menuItem}</p>
                        </div>
                    )
            })}
          

           
        </div>
    );
}

export default MenuBar;