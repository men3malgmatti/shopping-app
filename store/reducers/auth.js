import { AUTH, LOGOUT, SIGN_IN, SIGN_UP } from "../actions/auth";

const initialState= {
    token:'',
    userId: ''
};


const authReducer = (state= initialState, action) =>{
    
    switch (action.type) {
        
        case SIGN_UP:
            return{
                token: action.payload.token,
                userId: action.payload.userId
            }
        case SIGN_IN:
            return{
                token: action.payload.token,
                userId: action.payload.userId
            }

        case AUTH:
            return{
                token: action.payload.token,
                userId : action.payload.userId
            }    
        
        case LOGOUT:
            return{
                token: null,
                userId : null
            }
        
        default:
            return state
    }

};

export default authReducer;