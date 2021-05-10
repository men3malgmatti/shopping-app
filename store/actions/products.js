import Product from "../../models/product";

export const DELETE_PRODUCT= 'delete_product';
export const CREATE_PRODUCT= 'create_product';
export const UPDATE_PRODUCT= 'update_product';
export const LOAD_PRODUCTS= 'load_products';

export const loadProducts=()=>{
    return async (dispatch,getState)=>{
    try {
        let {userId}= getState().auth
        const response = await fetch('https://shopping-app-984f2-default-rtdb.europe-west1.firebasedatabase.app/products.json')
        const resData= await response.json();
        
        const allProducts= [];
        for (const key in resData){
            allProducts.push(new Product(key,resData[key].userId,resData[key].title,resData[key].imageUrl,resData[key].description,+resData[key].price))
        }
        dispatch({type:LOAD_PRODUCTS, payload:{allProducts,userId}})
    } catch (error) {  
        throw new Error('error loading data')
    }
        
    }
}


export const createProduct=(product)=>{
   return async (dispatch,getState)=>{
    let {token,userId}= getState().auth
    const response= await fetch(`https://shopping-app-984f2-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`,
    {method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({...product,ownerId: userId})
    });
    const resData= await response.json();
    const newProduct={...product, id:resData.name, userId }
    dispatch({ type: CREATE_PRODUCT, payload: {newProduct} })

   } 
}
export const updateProduct= (pid,product)=>{
    return async (dispatch,getState)=>{
        let token= getState().auth.token
        await fetch(`https://shopping-app-984f2-default-rtdb.europe-west1.firebasedatabase.app/products/${pid}.json?auth=${token}`,
        {   method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(product)
        });
        
        dispatch({ type: UPDATE_PRODUCT, payload: {pid,product} })
    }

 }

export const deleteProduct =(pid)=>{
    return async (dispatch,getState)=>{
        let token= getState().auth.token
        await fetch(`https://shopping-app-984f2-default-rtdb.europe-west1.firebasedatabase.app/products/${pid}.json?auth=${token}`,
        {
            method:'delete'
        })
        dispatch({type: DELETE_PRODUCT, payload:{pid} })

    }
}