import { ADD_ORDER } from "../actions/order";
import Order from "../../models/order";

const initialState = {
    orders: []
}



const ordersReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_ORDER:
            const addedOrder = new Order((new Date).toString(), action.payload.cartItems, action.payload.totalAmount, new Date)
            const newOrders = state.orders.concat(addedOrder)
            return { ...state, orders: newOrders }
        default:
            return state
    }
}


export default ordersReducer