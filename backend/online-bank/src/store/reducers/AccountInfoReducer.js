import { CoreApi } from "../../api/CoreApi";

const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
const SET_OPERATIONS_AND_PAGE_INFO = 'SET_OPERATIONS_AND_PAGE_INFO';
const SET_USER_ID = 'SET_USER_ID';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

let initialState = {
    userId : '',
    account : {},
    operations : [],
    pageInfo: {
        pageSize: 5,
        pageCount: 0,
        currentPage : 1
    }

}

const AccountInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCOUNT_INFO : {
            return {
                ...state,
                account: action.account
            }
        }
        case SET_OPERATIONS_AND_PAGE_INFO : {
            return {
                ...state,
                operations : action.operations,
                pageInfo: action.pageInfo
            }
        }
        case SET_USER_ID: {
            return {
                ...state,
                userId: action.userId
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                pageInfo: { ...state.pageInfo, currentPage: action.pageNumber}
            }
        }
        default:
            return state;
    }
}

// ACTIONS
// Обновить информацию об аккаунте
export const setAccountInfoActionCreator = (account) => {
    return {
        type: SET_ACCOUNT_INFO,
        account: account
    }
};
// Обновить информацию об операциях счета и пагинации
export const setOperationsAndPageInfoActionCreator = (operations, pageInfo) => {
    return {
        type: SET_OPERATIONS_AND_PAGE_INFO,
        operations: operations,
        pageInfo: pageInfo
    }
};
// Обновить информацию id пользователя
export const setAccountUserIdActionCreator = (userId) => {
    return {
        type: SET_USER_ID,
        userId: userId
    }
};
// Обновить текущую страницу
export const setCurrentPageActionCreator = (pageNumber) => {
    return {
        type: SET_CURRENT_PAGE,
        pageNumber: pageNumber
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
export const getOperationsAndPageInfoThunkCreator = (userId, accountId, pageNumber) => {
    return (dispatch) => {
        CoreApi.getAccountOperations(userId, accountId, pageNumber)
            .then(data => {
                dispatch(setOperationsAndPageInfoActionCreator(data.operations, data.pageInfo));
            })
    }
}

export default AccountInfoReducer;