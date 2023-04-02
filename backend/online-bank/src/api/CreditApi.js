import axios from 'axios';

const baseUrl = 'https://localhost:7239/api/';

const coreInstanse = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const CreditApi = {
    createNewCreditRate(title, description, interestRate) {
        const body = {
            title: title,
            description: description,
            interestRate: interestRate
        }
        return coreInstanse.post('CreditRate/NewCreditRate', body)
    },
    getUserCreditRating(userId) {
        return coreInstanse.get(`CreditRating?userID=${userId}`)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {
                console.log(error.response.data.error)
            });
    },
    getAllUserCredits(userId) {
        return coreInstanse.get(`UserCredit/userCredits?userId=${userId}`)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {
                console.log(error.response.data.error)
            });
    },
    getCreditOverduePayments(userId, creditId) {
        return coreInstanse.get(`UserCredit/userCredits/${userId}/overduePayments?creditId=${creditId}`)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {
                console.log(error.response.data.error)
            });
    }
}