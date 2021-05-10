import { ADD_ORDER, LOAD_ORDERS } from "../actions/order";
import Order from "../../models/order";

const initialState = {
    orders: []
}



const ordersReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case LOAD_ORDERS:
            return {orders: action.payload}
        
        case ADD_ORDER:
            const addedOrder = new Order(action.payload.id, action.payload.cartItems, action.payload.totalAmount, action.payload.date)
            const newOrders = state.orders.concat(addedOrder)
            return { ...state, orders: newOrders }
        default:
            return state
    }
}


export default ordersReducer