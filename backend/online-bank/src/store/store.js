import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ClientsReducer from './reducers/ClientsReducer';
import CreditsReducer from './reducers/CreditsReducer';
import EmployeesReducer from "./reducers/EmployeesReducer";


let reducers = combineReducers({
    employeePage: EmployeesReducer,
    creditPage: CreditsReducer,
    clientPage: ClientsReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;