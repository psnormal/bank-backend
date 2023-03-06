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
    }
}