import { UserApi } from "../../api/UserApi";

const SET_EMPLOYEES = 'SET_EMPLOYEES';
const BLOCK_EMPLOYEE = 'BLOCK_EMPLOYEE';
const SET_NEW_EMPLOYEE = 'SET_NEW_EMPLOYEE';
const CLEAR_NEW_EMPLOYEE = 'CLEAR_NEW_EMPLOYEE';

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
        case CLEAR_NEW_EMPLOYEE: {
            newState.newEmployee.name = '';
            newState.newEmployee.lastname = '';
            newState.newEmployee.password = '';
            return newState;
        }
        default:
            return state;
    }
};

// Actions
// Обновить массив сотрудников после получения данных с сервера
export const setEmployeesActionCreator = (employees) => {
    return {type: SET_EMPLOYEES, 
            employees: employees}
};
// Заблокировать сотрудника 
export const blockEmployeesActionCreator = (id) => {
    return {type: BLOCK_EMPLOYEE, 
            id: id}
};
// Обновить состояние создаваемого сотрудника
export const setNewEmployeeActionCreator = (newEmployee) => {
    return {type: SET_NEW_EMPLOYEE,
            newEmp: newEmployee}
}
// Очистить данные о созданном сотруднике
export const clearNewEmployeeActionCreator = () => {
    return {
        type: CLEAR_NEW_EMPLOYEE
    }
}

// Thunks
// Получить всех сотрудников с сервера
export const getEmployeesThunkCreator = () => {
    return (dispatch) => {
        UserApi.getAllUsers()
        .then(data => {
            data = data.filter(employee => employee.role == 1)
            dispatch(setEmployeesActionCreator(data));
        })
    }
}
// Заблокировать сотрудника на сервере
export const blockAnEmployeeThunkCreator = (employeeId) => {
    return (dispatch) => {
        UserApi.blockUser(employeeId)
        .then(() => {
            console.log('user was blocked')
            UserApi.getAllUsers()
            .then(data => {
                data = data.filter(employee => employee.role == 1)
                dispatch(setEmployeesActionCreator(data));
            })
        })
    }
}
// Создать сотрудника на сервере
export const createNewEmployeeThunkCreator = (name, lastname, password) => {
    return (dispatch) => {
        UserApi.registerEmployee(name, lastname, password)
        .then(() => {
            dispatch(clearNewEmployeeActionCreator)
            UserApi.getAllUsers()
            .then(data => {
                data = data.filter(employee => employee.role == 1)
                dispatch(setEmployeesActionCreator(data));
            })
        })
    }

}

export default EmployeesReducer;