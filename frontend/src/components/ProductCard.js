import ProductDetail from "./ProductDetail"
import './ProductCard.css';
import {Link} from 'react-router-dom';

const ProductCard = props=>{
    //product info
    const {image_url, title, price,_id, onClickHandler} = props;
    return(

        <div className='productCard'>
             <img
             src={image_url}
            />
            <div className='productCard__info'>
                <h4 onClick={onClickHandler}>{title}</h4>
                <p>$ {price}</p>
            </div>

        </div>

    )
}

export default ProductCard;