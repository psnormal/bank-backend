import axios from 'axios';

const baseUrl = 'https://localhost:7139/api/';

const coreInstanse = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const CoreApi = {
    getAllUserAccounts(userId) {
        return coreInstanse.get(`accounts/all?UserID=${userId}`)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {
                console.log(error.response.data.error)
            });
    },
    getUserAccountInfo(userId, accountId) {
        return coreInstanse.get(`account/${accountId}?UserID=${userId}`)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {
                console.log(error.response.data.error)
            });
    },
    getAccountOperations(userId, accountId) {
        return coreInstanse.get(`account/${accountId}/operations?UserID=${userId}`)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {
                return {
                    operations: [],
                    pageInfo: {
                        pageSize: 5,
                        pageCount: 0,
                        currentPage: 0
                    }
                }
                console.log(error.response.data.error)
            });
    }
}
