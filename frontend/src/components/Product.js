import './Product.css';
import {Link} from 'react-router-dom';

const Product = (props)=>{
   

    const{title, image_url, onClickHandler, _id} = props;
    
    return(
        <div className="product" >
            <div className='product__info'>
                <h3>{title}</h3>
                <img
                src={image_url}
                />
        
                {/* <p id = 'shopNow' onClick={()=>history.push(`/productList/${_id}`)}>shop now</p> */}
                <Link to = {`productList?categoryId=${_id}`}>
                <p id = 'shopNow' onClick={onClickHandler}>shop now</p>
                </Link>

            </div>
            

        </div>
    )
}

export default Product