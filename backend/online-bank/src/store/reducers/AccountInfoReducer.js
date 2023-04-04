import { CoreApi } from "../../api/CoreApi";
import { HubConnectionBuilder} from "@microsoft/signalr";

const SET_CONNECTION = 'SET_CONNECTION';
const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
const SET_OPERATIONS = 'SET_OPERATIONS';
const SET_USER_ID = 'SET_USER_ID';

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

// Работа с сокетом
const startSocketAndJoinToAccountHistory = async (connection, accNum) => {
    await connection.start();
    await connection.invoke("JoinToAccountHistory", accNum);
}
export const joinToAccountHistory = (stateConnection, userId, accountNumber) => {
    return (dispatch) => {
        if (stateConnection === '') {
            try {
                const connection = new HubConnectionBuilder()
                    .withUrl("https://localhost:7139/operations")
                    .withAutomaticReconnect()
                    .build();

                connection.on("ReceiveMessage", (message) => {
                    console.log(message);
                });

                connection.on("GetOperations", (data) => {
                    dispatch(setOperationsInfoActionCreator(data.operations))
                })

                connection.onclose(e => {
                    dispatch(setConnectionActionCreator(''))
                });

                startSocketAndJoinToAccountHistory(connection, accountNumber)
                    .then(() => {
                        CoreApi.getAccountOperations(userId, accountNumber)
                    });

                dispatch(setConnectionActionCreator(connection))
            } catch (e) { console.log(e) }
        }
    }
}

export default AccountInfoReducer;