import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./actionTypes";


const initialState = {
  isAuth: false,
  token: "",
  isLoading: false,
  isError: false,
  user:{}
};

const loginReducer = (state = initialState,{type,payload}) => {
  console.log(state)
  switch(type){
    case LOGIN_REQUEST:
      return{
        isAuth: false,
        token: "",
        isLoading: true,
        isError: false,
        user:{}
      }
      case LOGIN_SUCCESS:
      return{
        isAuth: true,
        token: payload.token,
        isLoading: false,
        isError: false,
        user:payload.avatar
      }
      case LOGIN_FAILURE:
      return{
        isAuth: false,
        token: "",
        isLoading: false,
        isError: true,
        user:{}
      }
      case LOGOUT:
      return{
        isAuth: false,
        token: "",
        isLoading: false,
        isError: true,
        user:{}
      }
    default:
      return state;
  }
};

export { loginReducer };
