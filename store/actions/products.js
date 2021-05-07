import Product from "../../models/product";

export const DELETE_PRODUCT= 'delete_product';
export const CREATE_PRODUCT= 'create_product';
export const UPDATE_PRODUCT= 'update_product';
export const LOAD_PRODUCTS= 'load_products';

export const loadProducts=()=>{
    return async dispatch=>{
    try {
        const response = await fetch('https://shopping-app-984f2-default-rtdb.europe-west1.firebasedatabase.app/products.json')
        const resData= await response.json();
        
        const allProducts= [];
        for (const key in resData){
            allProducts.push(new Product(key,'u1',resData[key].title,resData[key].imageUrl,resData[key].description,resData[key].price))
        }
        dispatch({type:LOAD_PRODUCTS, payload:allProducts})
    } catch (error) {
        
        throw new Error('error loading data')
    }
        
    }
}


export const createProduct=(product)=>{
   return async dispatch=>{
    
    const response= await fetch('https://shopping-app-984f2-default-rtdb.europe-west1.firebasedatabase.app/products.json',
    {method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(product)
    });
    const resData= await response.json();
    const newProduct={...product, id:resData.name}
    dispatch({ type: CREATE_PRODUCT, payload: {newProduct} })

   } 
}
export const updateProduct= (pid,product)=>{
    return async (dispatch)=>{
        await fetch(`https://shopping-app-984f2-default-rtdb.europe-west1.firebasedatabase.app/products/${pid}.json`,
        {   method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(product)
        });
    
        dispatch({ type: UPDATE_PRODUCT, payload: {pid,product} })
    }

 }

export const deleteProduct =(pid)=>{
    return async (dispatch)=>{
        await fetch(`https://shopping-app-984f2-default-rtdb.europe-west1.firebasedatabase.app/products/${pid}.json`,
        {
            method:'delete'
        })
        dispatch({type: DELETE_PRODUCT, payload:{pid} })

    }
}