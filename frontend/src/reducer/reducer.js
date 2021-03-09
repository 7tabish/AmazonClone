export const initialState = {
    basket: [],
    user: null
};

export const getBasketTotal = (basket)=>{
    return(
        basket?.reduce((amount, item)=>item.totalPrice + amount, 0)
    )
}

const reducer = (state, action)=>{

    switch(action.type){
        case "ADD_TO_BASKET":
            return{
                ...state,
                basket: [...state.basket, action.item],
            };

        case "REMOVE_FROM_CART":
            return {
                ...state,
                basket: state.basket.filter(item => item._id !== action.id)
            }

        case "REMOVE_BASKET":
            return{
                ...state,
                basket: []
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
                }        

        default:
            return;
    }
}


export default reducer;