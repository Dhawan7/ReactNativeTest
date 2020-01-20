// Emp Reducer
import * as types from './actionTypes'

export const INITIAL_STATE = {
    empData:{
        name :'',
        age : '',
        salary : '',
        id:''
    },
    empList : [],
    empLoading:false,
    empMessage:null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case types.ADD_EMP:
      return {
        ...state, 
        empLoading: true, 
      }
    case types.ADD_EMP_SUCCESS:
      return {
        ...state, 
        empLoading:false,
        empMessage:'Success',
        empData:action.data
      }
    case types.ADD_EMP_FAIL:
      return {
        ...state, 
        empLoading:false,
        empMessage:action.message,
      }
    case types.ADD_EMP_LOADING:
    return {
        ...state, 
        empLoading:action.boolean,
    }
    case types.GET_EMP_LIST:
      return {
        ...state, 
        empLoading: true, 
      }
    case types.GET_EMP_LIST_SUCCESS:        
      return {
        ...state, 
        empLoading:false,
        empMessage:'Success',
        empList:action.data
      }
    case types.GET_EMP_LIST_FAIL:
      return {
        ...state, 
        empLoading:false,
        empMessage:action.message,
      }
    case types.GET_EMP_LIST_LOADING:
    return {
        ...state, 
        empLoading:action.boolean,
    }
    default:
      return state
  }
}
