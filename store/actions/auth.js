import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGN_UP= 'SIGN_UP';
export const SIGN_IN= 'SIGN_IN';
export const AUTH= 'AUTH';
export const LOGOUT= 'LOG_OUT';

export const authenticate =(token, userId )=>{
    return {type: AUTH, payload:{token, userId}}
}

export const logOut= ()=>{
  return {type:LOGOUT}
}

export const signUp = (email, password)=>{
    return async dispatch=>{
      console.log(email,password);  
      const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-FqmqyBXGUCc4DqDVx5APDX9yHwzXqvw',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              email,
              password,
              returnSecureToken:true
          })
      });
      if (!response.ok) {
        const resData= await response.json();     
        throw  new Error(resData.error.message);
      }
      const resData= await response.json();
      
      dispatch({type:SIGN_UP, payload:{token:resData.idToken, userId:resData.localId}})
      const expiryDate= new Date().getTime() + parseInt(resData.expiresIn )*1000
      
      saveToLocalStorage(resData.idToken, resData.localId, expiryDate)
    }
    
};

export const signIn = (email, password)=>{
    return async dispatch=>{
        
      const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-FqmqyBXGUCc4DqDVx5APDX9yHwzXqvw',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              email,
              password,
              returnSecureToken:true
          })
      });

      if (!response.ok) {
        const resData= await response.json();     
        throw  new Error(resData.error.message);
      }
      const resData= await response.json();
      
      dispatch({type:SIGN_IN,payload:{token:resData.idToken, userId:resData.localId}})
      const expiryDate= new Date(new Date().getTime() + parseInt(resData.expiresIn )*1000).toISOString()
      console.log(expiryDate);
      saveToLocalStorage(resData.idToken, resData.localId, expiryDate)
    }
    
}

const saveToLocalStorage= async (token,id,expiryDate)=>{
   try {
    await AsyncStorage.setItem('credential',JSON.stringify({
      token,id,expiryDate
    }))
   } catch (error) {
     console.log(error);
   }
}