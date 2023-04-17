import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import AccountInfoReducer from './reducers/AccountInfoReducer';
import ClientsReducer from './reducers/ClientsReducer';
import CreditsInfoReducer from './reducers/CreditsInfoReducer';
import CreditsReducer from './reducers/CreditsReducer';
import EmployeesReducer from "./reducers/EmployeesReducer";

let reducers = combineReducers({
    employeePage: EmployeesReducer,
    creditPage: CreditsReducer,
    clientPage: ClientsReducer,
    accountInfoPage: AccountInfoReducer,
    creditsInfoPage: CreditsInfoReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

/*const store = createStore(reducers, applyMiddleware(thunk));*/

export default store;
