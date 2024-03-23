import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE, LOGOUT } from "./actionTypes"
import axios from "axios"

export const login=(details)=>{
    return async (dispatch)=>{
        try {
            dispatch({type:LOGIN_REQUEST})
            let res=await axios.post(`http://localhost:5000/auth/login`,details)
            console.log(res.data)
            dispatch({type:LOGIN_SUCCESS,payload:{token:res.data.token,avatar:res.data.avatar}})
        } catch (error) {
            dispatch({type:LOGIN_FAILURE})
            
        }
    }
}
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
