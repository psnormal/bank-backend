import { CoreApi } from "../../api/CoreApi";
import { HubConnectionBuilder} from "@microsoft/signalr";

const SET_CONNECTION = 'SET_CONNECTION';
const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
const SET_OPERATIONS = 'SET_OPERATIONS';
const SET_USER_ID = 'SET_USER_ID';
const SET_CLIENT_ACCOUNTS = 'SET_CLIENT_ACCOUNTS'

let initialState = {
    connection: '',
    userId : '',
    account : {},
    operations: [],
    clientAccounts: []
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
        case SET_OPERATIONS: {
            let operationsWithTypes = defineOperationTypes(action.operations, state.clientAccounts);
            return {
                ...state,
                operations: operationsWithTypes
            }
        }
        case SET_USER_ID: {
            return {
                ...state,
                userId: action.userId
            }
        }
        case SET_CLIENT_ACCOUNTS: {
            return {
                ...state,
                clientAccounts: action.clientAccounts
            }
        }
        default:
            return state;
    }
}

const defineOperationTypes = (operations, clientAccounts) => {
    operations.map(operation => {
        if (operation.senderAccountNumber === 0 && operation.recipientAccountNumber === 0) {
            operation.transactionAmount >= 0 ? operation.type = "Внесение средств" : operation.type = "Списание средств";
        }
        else if (operation.senderAccountNumber !== 0 && operation.recipientAccountNumber === 0) {
            clientAccounts.includes(operation.senderAccountNumber) ? operation.type = "Между своими счетами" : operation.type = "Входящий перевод";
        }
        else if (operation.senderAccountNumber === 0 && operation.recipientAccountNumber !== 0) {
            clientAccounts.includes(operation.recipientAccountNumber) ? operation.type = "Между своими счетами" : operation.type = "Перевод клиенту банка";
        }
        else
            operation.type = "Банковская операция";
    })
    return operations
}

// ACTIONS
// �������� ���������� � ����������
export const setConnectionActionCreator = (connection) => {
    return {
        type: SET_CONNECTION,
        connection: connection
    }
};
// �������� ���������� �� ��������
export const setAccountInfoActionCreator = (account) => {
    return {
        type: SET_ACCOUNT_INFO,
        account: account
    }
};
// �������� ���������� �� ��������� ����� � ���������
export const setOperationsInfoActionCreator = (operations) => {
    return {
        type: SET_OPERATIONS,
        operations: operations
    }
};
// �������� ���������� id ������������
export const setAccountUserIdActionCreator = (userId) => {
    return {
        type: SET_USER_ID,
        userId: userId
    }
};
// �������� ���������� � ������� ������ �������
export const setClientAccountsActionCreator = (accounts) => {
    return {
        type: SET_CLIENT_ACCOUNTS,
        clientAccounts: accounts
    }
};

// THUNKS
// �������� ���������� �� �������� � �������
export const getAccountInfoThunkCreator = (userId, accountId) => {
    return (dispatch) => {
        CoreApi.getUserAccountInfo(userId, accountId)
            .then(data => {
                dispatch(setAccountInfoActionCreator(data));
            })
    }
}
// �������� ���������� � ������� ������ �������
export const getClientAccountsThunkCreator = (userId) => {
    return (dispatch) => {
        CoreApi.getAllUserAccounts(userId)
            .then(data => {
                let clientAccounts = [...data.accounts];
                let clientAccountsNumbers = clientAccounts.map(clientAccount => clientAccount.accountNumber);
                dispatch(setClientAccountsActionCreator(clientAccountsNumbers)); 
            })
    }
}

// ������ � �������
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