import { SIGN_IN, SIGN_UP } from "../actions/auth";

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
        default:
            return state
    }

};

export default authReducer;