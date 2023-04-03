import { CreditApi } from "../../api/CreditApi";
import { UserApi } from "../../api/UserApi";

const SET_CLIENT_INFORMATION = "SET_CLIENT_INFORMATION"
const SET_CLIENT_CREDIT_RATING = "SET_CLIENT_CREDIT_RATING"
const SET_CLIENT_CREDITS = "SET_CLIENT_CREDITS"

let initialState = {
    clientId: '',
    name: '',
    lastname: '',
    creditRating: 100,
    credits: []
}

const CreditsInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLIENT_INFORMATION: {
            return {
                ...state,
                clientId: action.id,
                name: action.name,
                lastname: action.lastname
            }
        }
        case SET_CLIENT_CREDIT_RATING: {
            console.log(action.creditRating)
            return {
                ...state,
                creditRating: action.creditRating
            }
        }
        case SET_CLIENT_CREDITS: {
            return {
                ...state,
                credits: action.credits
            }
        }
        default:
            return state;
    }
}

// ACTIONS
// Обновить информацию о клиенте
export const setClientInfoActionCreator = (id, name, lastname) => {
    return {
        type: SET_CLIENT_INFORMATION,
        id: id,
        name: name,
        lastname: lastname
    }
};
// Обновить крудитный рейтинг клиента
export const setClientCreditRatingActionCreator = (creditRating) => {
    return {
        type: SET_CLIENT_CREDIT_RATING,
        creditRating: creditRating
    }
};
// Обновить информацию о кредитах клиента
export const setClientCreditsActionCreator = (credits) => {
    return {
        type: SET_CLIENT_CREDITS,
        credits: credits
    }
};


// THUNKS
// Получить информацию о клиенте с сервера
export const getClientInfoThunkCreator = (clientId) => {
    return (dispatch) => {
        UserApi.getClientInfo(clientId)
            .then(data => {
                dispatch(setClientInfoActionCreator(data.userID, data.name, data.lastname));
            })
    }
}
// Получить информацию о кредитном рейтинге клиента с сервера
export const getClientCreditRatingThunkCreator = (clientId) => {
    return (dispatch) => {
        CreditApi.getUserCreditRating(clientId)
            .then(creditRating => {
                dispatch(setClientCreditRatingActionCreator(creditRating));
            })
    }
}
// Получить информацию кредитах и задолженностях по ним с сервера
const connectCreditsAndOverduePayments = async (credits, clientId) => {
    await Promise.all(credits.map(credit => {
        return CreditApi.getCreditOverduePayments(clientId, credit.creditID)
            .then(data => {
                credit.overduePayments = [...data]
            })
    }))

    return credits;
}
export const getClientCreditsThunkCreator = (clientId) => {
    return (dispatch) => {
        CreditApi.getAllUserCredits(clientId)
            .then(credits => {
                if (credits.length != 0) {
                    connectCreditsAndOverduePayments(credits, clientId)
                        .then(creditsAndOverduePayments => {
                            dispatch(setClientCreditsActionCreator(creditsAndOverduePayments))
                        })
                }
                else {
                    dispatch(setClientCreditsActionCreator(credits))
                } 
            })
    }
}

export default CreditsInfoReducer;