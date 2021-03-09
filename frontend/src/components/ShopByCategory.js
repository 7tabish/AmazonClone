import './ShopByCategory.css';


const ShopByCategory = ()=>{
    return(
        <div className='ShopByCategory product'>
            <h3>Shop by category</h3>
            <div className='ShopByCategory__row'>
                <div className='ShopByCategory__info'>
                    <img
                    src = '/images/computer.png'/>
                    <p>Computers</p>
                    
                </div>

                <div className='ShopByCategory__info'>
                    <img 
                    src ='/images/video_games.png'
                    />
                    <p>Video Games</p>

                </div>

                <div className='ShopByCategory__info'>
                    <img
                    src = '/images/baby.png'
                    />
                    <p>Baby</p>

                </div>
                <div className='ShopByCategory__info'>
                    <img
                    src = '/images/toys.png'
                    /> 
                    <p>Toys & Games</p>

                </div>
        

            </div>
        </div>
    )
}

export default ShopByCategory;