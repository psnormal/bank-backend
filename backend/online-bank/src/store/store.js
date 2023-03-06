import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import EmployeesReducer from "./reducers/EmployeesReducer";


let reducers = combineReducers({
    employeePage: EmployeesReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;