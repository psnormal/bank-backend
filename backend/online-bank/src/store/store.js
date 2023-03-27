import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import ClientsReducer from './reducers/ClientsReducer';
import CreditsReducer from './reducers/CreditsReducer';
import EmployeesReducer from "./reducers/EmployeesReducer";


let reducers = combineReducers({
    employeePage: EmployeesReducer,
    creditPage: CreditsReducer,
    clientPage: ClientsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

/*const store = createStore(reducers, applyMiddleware(thunk));*/

export default store;
