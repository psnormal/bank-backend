class API{

    core = 'https://localhost:7139/';

    client = 'https://localhost:7099/';
    
    credit = 'https://localhost:7239/';

    proxy = 'https://localhost:7139/';

    //GET информация о кредитах
    getCreditRates(){
        const res = fetch(this.credit + `api/CreditRate/AllCreditRates`).then(response => 
            response.json()
        );
        return res;
    };

    //GET информация о кредитах клиента
    getUserCredits(userId: string){
        const res = fetch(this.credit + `api/UserCredit/userCredits?userId=${userId}`).then(response => 
            response.json()
        );
        return res;
    };

    //GET информация о клиенте
    getClientInformation(userId: string) {
        const response = fetch(this.client + `api/User/${userId}/ClientInformation`).then(response => 
            response.json()
        );
        return response;
    };

    //GET информация о кредитном рейтинге клиента
    getCreditRating(userId: string) {
        const response = fetch(this.credit + `api/CreditRating?UserID=${userId}`).then(response => 
            response.json()
        );
        return response;
    };

    //GET информация о задолженностях по кредиту
    getOverduePayments(userId: string, creditId: string) {
        const response = fetch(this.credit + `api/UserCredit/userCredits/${userId}/overduePayments?creditId=${creditId}`).then(response => 
            response.json()
        );
        return response;
    };

    //GET информация о всех счетах клиент
    async getAccountsAll(userId: string){
        const res = await fetch(this.core + `api/accounts/all?UserID=${userId}`).then(response => 
            response.json()
        );
        return res;
    };

    //GET информация о конкретном счете
    async getAccount(userId: string, id: number){
        const res = await fetch(this.core + `api/account/${id}?UserID=${userId}`).then(response => 
            response.json()
        );
        return res;
    };

    //GET история операций по счету
    async getHistory(userId: string, id: number){
        const res = await fetch(this.core + `api/account/${id}/operations?UserID=${userId}`).then(response => { }
           /* response.json()*/
        );
        return res;
    };

    //POST создание счета
    async createAccount(userId: string, type: number){
        const body = {
            userID: userId,
            type: type,
        };
        const blob = new Blob([JSON.stringify(body, null, 2)], {type : 'application/json'});
		const res = await fetch(this.core + 'api/account/create', {method: 'post', body: blob }).then(res=>res.json());
        console.log(blob);
        return res;
	}

    //POST создать операцию
    async createOperation(userId: string, accountNumber: number, date: string, transactionAmount: number){
        const body = {
            userID: userId,
            accountNumber: accountNumber,
            dateTime: date,
            transactionAmount: transactionAmount,
        };
        const blob = new Blob([JSON.stringify(body, null, 2)], {type : 'application/json'});
        const res = await fetch(this.proxy + 'api/operation/create', { method: 'post', body: blob }).then(response => response.json());
        console.log(blob);
        return res;
	}

    //POST создать транзакцию
    async createTransaction(userId: string, senderAccountNumber: number, recipientAccountNumber: number, date: string, transactionAmount: number){
        const body = {
            userID: userId,
            senderAccountNumber: senderAccountNumber,
            recipientAccountNumber: recipientAccountNumber,
            dateTime: date,
            transactionAmount: transactionAmount,
        };
        const blob = new Blob([JSON.stringify(body, null, 2)], {type : 'application/json'});
        const res = await fetch(this.proxy + 'api/transaction/create', { method: 'post', body: blob }).then(response => response.json());
        console.log(blob);
        return res;
	}

    //POST взять кредит
    async takeCredit(userId: string, credit: string, paymentTerm: number, loanAmount: number){
        const body = {
            paymentTerm: paymentTerm,
            loanAmount: loanAmount,
        };
        const blob = new Blob([JSON.stringify(body, null, 2)], {type : 'application/json'});
		const res = await fetch(this.core + `api/UserCredit/${credit}/takeCredit?userId=${userId}`, {method: 'post', body: blob }).then(res=>res.json());
        return res;
	}

    //PUT изменить статус счета
    async changeAccountState(userId: string, state: number, id: number){
		const res = await fetch(this.core + `api/account/${id}/edit?UserID=${userId}&accountState=${state}`, {method: 'put' }).then(res=>res.json());
        return res;
	}

}

export default new API()
