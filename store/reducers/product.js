
import PRODUCTS from "../../data/dummy-data"
import Product from "../../models/product";
import { CREATE_PRODUCT, DELETE_PRODUCT, LOAD_PRODUCTS, UPDATE_PRODUCT } from "../actions/products";



const initialState = {
    avaliableProducts: [],
    userProducts: [],
}


const productReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case LOAD_PRODUCTS:
            action.payload.allProducts.forEach(product => console.log( product ));
            return{ avaliableProducts: action.payload.allProducts,
                userProducts: action.payload.allProducts.filter(product => product.ownerId === action.payload.userId),}

        case CREATE_PRODUCT:
            let {id,userId,title,description,price,imageUrl}= action.payload.newProduct
            const addedItem= new Product(id,userId,title, imageUrl,description,+price);
            console.log(addedItem);
            return {
                ...state,
                avaliableProducts:state.avaliableProducts.concat(addedItem),
                userProducts:state.avaliableProducts.concat(addedItem)
            }
        
        case UPDATE_PRODUCT:
            let index = state.userProducts.findIndex((prod)=>prod.id===action.payload.pid);
            
            const updatedItem= new Product(state.avaliableProducts[index].id,state.avaliableProducts[index].user,action.payload.product.title, action.payload.product.imageUrl,action.payload.product.description,state.avaliableProducts[index].price);
            const updatedUsrProd= [...state.userProducts]
            updatedUsrProd[index]= updatedItem 
            index = state.avaliableProducts.findIndex((prod)=>prod.id===action.payload.pid);
            const updatedAvlProd= [...state.avaliableProducts]
            updatedAvlProd[index]= updatedItem
            return {
                ...state,
                avaliableProducts:updatedAvlProd,
                userProducts:updatedUsrProd  
            }

        case DELETE_PRODUCT:
            const updatedUserProduct= state.userProducts.filter(prod=> prod.id!== action.payload.pid);
            const updatedAvaliableProduct=state.avaliableProducts.filter(prod=> prod.id!== action.payload.pid);   
            return {
                ...state, 
                userProducts: updatedUserProduct,
                avaliableProducts: updatedAvaliableProduct
            };
    
        default:
            return state;
    }
    
    
}

export default productReducer;