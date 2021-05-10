import Order from "../../models/order";

export const ADD_ORDER = 'add_order';
export const LOAD_ORDERS= 'load_orders'

export const loadOrders= ()=>{
    return async  (dispatch,getState)=>{
        try {
            let {userId}= getState().auth
            const response = await fetch(`https://shopping-app-984f2-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`)
            const resData= await response.json();
            
            const allOrders= [];
            for (const key in resData){
                allOrders.push(new Order(key,resData[key].cartItems,resData[key].totalAmount,resData[key].date))
            }
            dispatch({type:LOAD_ORDERS, payload:allOrders})
        } catch (error) {
            
            throw new Error('error loading data')
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch,getState)=>{
        let {userId}= getState().auth
        const date= new Date().toISOString(); 
        const response= await fetch(`https://shopping-app-984f2-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`,
        {method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({cartItems,totalAmount,date})
        });
        ;
        const resData= await response.json();
        console.log(resData)
        dispatch({ type: ADD_ORDER, payload: { id:resData.id,cartItems, totalAmount,date} })
    
       } 
}