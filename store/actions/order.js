export const ADD_ORDER = 'add_order';

export const addOrder = (cartItems, totalAmount) => {
    return { type: ADD_ORDER, payload: { cartItems, totalAmount } }
}