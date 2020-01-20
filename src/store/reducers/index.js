import { combineReducers } from 'redux';

// Reducers
import EmpReducer from './emp/index';

const appReducer = combineReducers({
    EmpReducer,
});


export default appReducer;
