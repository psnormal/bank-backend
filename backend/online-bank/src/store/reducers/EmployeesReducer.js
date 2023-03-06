import { UserApi } from "../../api/UserApi";

const SET_EMPLOYEES = 'SET_EMPLOYEES';
const BLOCK_EMPLOYEE = 'BLOCK_EMPLOYEE';
const SET_NEW_EMPLOYEE = 'SET_NEW_EMPLOYEE';

let initialState = {
    employees: [],
    newEmployee: {
        name: '',
        lastname: '',
        password: ''
    }
}

const EmployeesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case SET_EMPLOYEES: {
            newState.employees = action.employees;
            return newState;
        }
        case BLOCK_EMPLOYEE: {return state;}
        case SET_NEW_EMPLOYEE: {
            newState.newEmployee = action.newEmp;
            return newState;
        }
        default:
            return state;
    }
};

// Actions
export const setEmployeesActionCreator = (employees) => {
    return {type: SET_EMPLOYEES, 
            employees: employees}
};
export const blockEmployeesActionCreator = (id) => {
    return {type: BLOCK_EMPLOYEE, 
            id: id}
};
export const setNewEmployeeActionCreator = (newEmployee) => {
    return {type: SET_NEW_EMPLOYEE,
            newEmp: newEmployee}
}

// Thunks
export const getEmployeesThunkCreator = () => {
    return (dispatch) => {
        UserApi.getAllUsers()
        .then(data => {
            // let allEmployees = data.filter(e => e.role == 'сотрудник')
            dispatch(setEmployeesActionCreator(data));
        })
    }
}
export const blockAnEmployeeThunkCreator = (employeeId) => {
    return (dispatch) => {
        UserApi.blockUser(employeeId)
        .then(() => {
            UserApi.getAllUsers()
            .then(data => {
                let allEmployees = data.filter(e => e.role === 'сотрудник')
                dispatch(setEmployeesActionCreator(allEmployees));
            })
        })
    }
}
export const createNewEmployeeThunkCreator = (name, lastname, password) => {
    return (dispatch) => {
        UserApi.registerEmployee(name, lastname, password)
        .then(() => {
            dispatch(setNewEmployeeActionCreator({
                name: '',
                lastname: '',
                password: ''
            }))
            UserApi.getAllUsers()
            .then(data => {
                // let allEmployees = data.filter(e => e.role == 'сотрудник')
                dispatch(setEmployeesActionCreator(data));
            })
        })
    }

}

export default EmployeesReducer;