import * as types from './actionTypes';
import {getApi} from '../../../services'
import AsyncStorage from '@react-native-community/async-storage';

// Add Emp 
export function addEmp(data)
{
  return async (dispatch) => 
  {
        dispatch(addEmpLoading(true))

        let config = {
            url : 'http://dummy.restapiexample.com/api/v1/create',
            type : 'POST',
            data : JSON.stringify(data)
        }
        await getApi(config)    
        .then((empObj)=>{         
            console.log(empObj);
            if (empObj)
            {
              dispatch(addEmpSuccess(empObj));
              dispatch(addEmpLoading(false));
              return empObj;
            }
            dispatch(addEmpLoading(false));
            dispatch(addEmpFail(empObj));
              return empObj;
            })
            
        .catch((repsonse)=>{
            dispatch(addEmpLoading(false));
            dispatch(addEmpFail(repsonse));
              return repsonse;
        })
        
  }
} 

  
  export const addEmpFail = (message) => {
    return { 
        type: types.ADD_EMP_FAIL,
        message
      }
  }
  
  export const addEmpSuccess = (data) => {
    
    return {
        type: types.ADD_EMP_SUCCESS,
        data 
    }
  }

  export function addEmpLoading(flag) {
    return {
      type: types.ADD_EMP_LOADING,
      boolean: flag,
    };
  }


// Get Emp List  
export function getEmpList()
{
  return async (dispatch) => 
  {
        dispatch(getEmpListLoading(true))

        let config = {
            url : 'http://dummy.restapiexample.com/api/v1/employees',
            type : 'GET',                 
        }
        await getApi(config)    
        .then((empObj)=>{                     
            if (empObj)
            {
              let empList = [];
              for(a in empObj.data)
              {
                if(empObj.data[a].employee_name != null)
                {
                    empList.push(empObj.data[a])
                }
              }
          
              // AsyncStorage.setItem('empList' , JSON.stringify(empList));
              dispatch(getEmpListSuccess(empList));
              dispatch(getEmpListLoading(false));
              return empObj;
            }
            dispatch(getEmpListLoading(false));
            dispatch(getEmpListFail(empObj));
            return empObj;
        })            
        .catch((repsonse)=>{
            dispatch(getEmpListLoading(false));
            dispatch(getEmpListFail(repsonse));
              return repsonse;
        })        
  }
} 

  
  export const getEmpListFail = (message) => {
    return { 
        type: types.GET_EMP_LIST_FAIL,
        message
      }
  }
  
  export const getEmpListSuccess = (data) => {
    
    return {
        type: types.GET_EMP_LIST_SUCCESS,
        data 
    }
  }

  export function getEmpListLoading(flag) {
    return {
      type: types.GET_EMP_LIST_LOADING,
      boolean: flag,
    };
  }


