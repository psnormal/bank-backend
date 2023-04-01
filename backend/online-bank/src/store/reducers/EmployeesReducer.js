import { UserApi } from "../../api/UserApi";

const SET_EMPLOYEES = 'SET_EMPLOYEES';
const UPDATE_NEW_EMPLOYEE = 'UPDATE_NEW_EMPLOYEE';
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
    switch(action.type) {
        case SET_EMPLOYEES: {
            return {
                ...state,
                employees : action.employees
            }
        }
        case UPDATE_NEW_EMPLOYEE: {
            return {
                ...state,
                newEmployee : action.newEmp
            }
        }
        case CLEAR_NEW_EMPLOYEE: {
            return {
                ...state,
                newEmployee: {
                    name: '',
                    lastname: '',
                    password: ''
                }
            }
        }
        default:
            return state;
    }
};

// Actions
// Обновить массив сотрудников после получения данных с сервера
export const setEmployeesActionCreator = (employees) => {
    return {
        type: SET_EMPLOYEES,
        employees: employees
    }
};
// Обновить состояние создаваемого сотрудника
export const updateNewEmployeeActionCreator = (newEmployee) => {
    return {
        type: UPDATE_NEW_EMPLOYEE,
        newEmp: newEmployee
    }
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
            UserApi.getAllUsers()
            .then(data => {
                data = data.filter(employee => employee.role == 1)
                dispatch(setEmployeesActionCreator(data));
            })
        })
    }
}
// Создать сотрудника на сервере
export const createNewEmployeeThunkCreator = (newEmp) => {
    return (dispatch) => {
        UserApi.registerEmployee(newEmp.name, newEmp.lastname, newEmp.password)
        .then(() => {
            dispatch(clearNewEmployeeActionCreator())
            UserApi.getAllUsers()
            .then(data => {
                data = data.filter(employee => employee.role == 1)
                dispatch(setEmployeesActionCreator(data));
            })
        })
    }

}

export default EmployeesReducer;