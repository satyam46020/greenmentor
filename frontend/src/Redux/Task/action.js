import axios from 'axios';
import * as ActionTypes from './actionTypes';

export const fetchtasks = (token,gender,category,sort,search,page,limit) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_TASKS_START });
    console.log(Date.now())
    var url=`http://localhost:5000/task`
    if(sort){
      url+=`&sort=${sort}`
    }
    if(search){
      url+=`&search=${search}`
    }
    try {
      const response = await axios.get(url,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)
      dispatch({
        type: ActionTypes.FETCH_TASKS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_TASKS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addtask = (taskData,token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/task', taskData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({
        type: ActionTypes.ADD_TASK_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error)
    }
  };
};

export const updatetask = (taskData,token) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`http://localhost:5000/task/${taskData._id}`, taskData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({
        type: ActionTypes.UPDATE_TASK_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error)
    }
  };
};

export const deletetask = (taskId,token) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:5000/task/${taskId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({
        type: ActionTypes.DELETE_TASK_SUCCESS,
        payload: { id: taskId },
      });
    } catch (error) {
      console.log(error)
    }
  };
};

export const gettaskById = (taskId,token) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_TASK_BY_ID_START });

    try {
      const response = await axios.get(`http://localhost:5000/task/${taskId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({
        type: ActionTypes.GET_TASK_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.GET_TASK_BY_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};
