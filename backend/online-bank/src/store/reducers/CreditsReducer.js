import { CreditApi } from "../../api/CreditApi";

const SET_NEW_CREDIT_RATE = 'SET_NEW_EMPLOYEE';
const CLEAR_NEW_CREDIT_RATE = 'CLEAR_NEW_EMPLOYEE';

let initialState = {
    newCreditRate: {
        title: '',
        description: '',
        interestRate: ''
    }
}

const CreditsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case SET_NEW_CREDIT_RATE: {
            newState.newCreditRate = action.newCreditRate;
            return newState;
        }
        case CLEAR_NEW_CREDIT_RATE: {
            newState.newCreditRate.title = '';
            newState.newCreditRate.description = '';
            newState.newCreditRate.interestRate = '';
            return newState;
        }
        default:
            return state;
    }
};

// Actions
// Обновить состояние создаваемого кредитного тарифа
export const setNewCreditRateActionCreator = (newCreditRate) => {
    return {
        type: SET_NEW_CREDIT_RATE,
        newCreditRate: newCreditRate
    }
}
// Очистить данные о созданном сотруднике
export const clearNewCreditRateActionCreator = () => {
    return {
        type: CLEAR_NEW_CREDIT_RATE
    }
}

// Thunks
// Создать сотрудника на сервере
export const createNewCreditRateThunkCreator = (title, description, interestRate) => {
    return (dispatch) => {
        CreditApi.createNewCreditRate(title, description, interestRate)
            .then(() => {
                dispatch(clearNewCreditRateActionCreator)
            })
    }

}

export default CreditsReducer;