import { CoreApi } from "../../api/CoreApi";
import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const SET_CONNECTION = 'SET_CONNECTION';
const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
const SET_OPERATIONS = 'SET_OPERATIONS';
const SET_USER_ID = 'SET_USER_ID';

/*const operationsHubUrl = 'https://localhost:7139/api/operations';

const connection = new HubConnectionBuilder()
    .withUrl(operationsHubUrl)
    .configureLogging(LogLevel.Information)
    .build();
*/

let initialState = {
    connection: '',
    userId : '',
    account : {},
    operations: []
}

const AccountInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONNECTION: {
            return {
                ...state,
                connection: action.connection
            }
        }
        case SET_ACCOUNT_INFO : {
            return {
                ...state,
                account: action.account
            }
        }
        case SET_OPERATIONS : {
            return {
                ...state,
                operations : action.operations
            }
        }
        case SET_USER_ID: {
            return {
                ...state,
                userId: action.userId
            }
        }
        default:
            return state;
    }
}

// ACTIONS
// Обновить информацию о соединении
export const setConnectionActionCreator = (connection) => {
    return {
        type: SET_CONNECTION,
        connection: connection
    }
};
// Обновить информацию об аккаунте
export const setAccountInfoActionCreator = (account) => {
    return {
        type: SET_ACCOUNT_INFO,
        account: account
    }
};
// Обновить информацию об операциях счета и пагинации
export const setOperationsInfoActionCreator = (operations) => {
    return {
        type: SET_OPERATIONS,
        operations: operations
    }
};
// Обновить информацию id пользователя
export const setAccountUserIdActionCreator = (userId) => {
    return {
        type: SET_USER_ID,
        userId: userId
    }
};

// THUNKS
// Получить информацию об аккаунте с сервера
export const getAccountInfoThunkCreator = (userId, accountId) => {
    return (dispatch) => {
        CoreApi.getUserAccountInfo(userId, accountId)
            .then(data => {
                dispatch(setAccountInfoActionCreator(data));
            })
    }
}
// Получить информацию об операциях счета и пагинации с сервера
export const getOperationsThunkCreator = (userId, accountId) => {
    return (dispatch) => {
        CoreApi.getAccountOperations(userId, accountId)
            .then(data => {
                dispatch(setOperationsInfoActionCreator(data.operations));
            })
    }
}


// Всякая ерунда с сокетом
const startSocket = async (connection) => {
    await connection.start();
}
const join = async (connection, accNum) => {
    await connection.invoke("JoinToAccountHistory", accNum); 
}
export const joinToAccountHistory = (accountNumber) => {
    return (dispatch) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7139/operations")
                .withAutomaticReconnect()
                .build();

            connection.on("ReceiveMessage", (message) => {
                console.log(message);
            });

            dispatch(setConnectionActionCreator(connection))

            startSocket(connection)
                .then(() => {
                    join(connection, accountNumber)
                })
        } catch (e) {
            console.log(e);
        }
    }
}

export default AccountInfoReducer;