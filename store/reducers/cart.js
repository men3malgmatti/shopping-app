import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import CartItem from '../../models/cartItem';
import { ADD_ORDER } from '../actions/order';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
    items: {},
    totalAmount: 0
}


const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const prod = action.payload
            if (state.items[prod.id]) {

                const quantity = state.items[prod.id].quantity + 1;
                const cartItem = new CartItem(prod.title, prod.price, quantity);
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [prod.id]: cartItem
                    },
                    totalAmount: state.totalAmount + prod.price
                }

            } else {
                const cartItem = new CartItem(prod.title, prod.price, 1);
                return {
                    ...state,
                    items: {
                        ...state.items, [prod.id]: cartItem
                    },
                    totalAmount: state.totalAmount + prod.price
                }
            }
        case REMOVE_FROM_CART:
            const product = state.items[action.payload];
            let updatedCartItems;
            let newAmount;
            if (product.quantity > 1) {
                // CASE MORE THAN ONE
                const newProd = new CartItem(product.title, product.price, product.quantity - 1);
                updatedCartItems = { ...state.items, [action.payload]: newProd };
                newAmount = state.totalAmount + (product.price * -1)
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.payload];
                newAmount = state.totalAmount + (product.price * -1)
            }
            return { ...state, items: { ...updatedCartItems }, totalAmount: newAmount }

        case ADD_ORDER:
            return initialState
        
        case DELETE_PRODUCT:
            if (!state.items[action.payload.pid]) {
                return state
            }
            const updatedItems= {...state.items};
            delete updatedItems[action.payload.pid]
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - state.items[action.payload.pid].sum
            }
            

        default:
            return state
    }
}

export default cartReducer;