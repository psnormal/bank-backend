import { CreditApi } from "../../api/CreditApi";

const UPDATE_NEW_CREDIT_RATE = 'UPDATE_NEW_CREDIT_RATE';
const CLEAR_NEW_CREDIT_RATE = 'CLEAR_NEW_EMPLOYEE';

let initialState = {
    newCreditRate: {
        title: '',
        description: '',
        interestRate: ''
    }
}

const CreditsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_CREDIT_RATE: {
            return {
                ...state,
                newCreditRate : action.newCreditRate
            }
        }
        case CLEAR_NEW_CREDIT_RATE: {
            return {
                ...state,
                newCreditRate: {
                    title: '',
                    description: '',
                    interestRate: ''
                }
            }
        }
        default:
            return state;
    }
};

// Actions
// Обновить состояние создаваемого кредитного тарифа
export const updateNewCreditRateActionCreator = (newCreditRate) => {
    return {
        type: UPDATE_NEW_CREDIT_RATE,
        newCreditRate: newCreditRate
    }
}
// Очистить данные о созданном кредитном тарифе
export const clearNewCreditRateActionCreator = () => {
    return {
        type: CLEAR_NEW_CREDIT_RATE
    }
}

// Thunks
// Создать крудитный тариф на сервере
export const createNewCreditRateThunkCreator = (newCreditRate) => {
    return (dispatch) => {
        CreditApi.createNewCreditRate(newCreditRate.title, newCreditRate.description, Number(newCreditRate.interestRate))
            .then(() => {
                dispatch(clearNewCreditRateActionCreator())
            })
    }

}

export default CreditsReducer;