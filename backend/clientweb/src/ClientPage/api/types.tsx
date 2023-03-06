export interface IAccount {
    accountNumber: number,
    balance: number,
    state: number,
    type: number,
}

export interface IClientInformation {
    name: string,
    lastname: string,
}

export interface IOperation {
    accountNumber: number,
    dateTime: string,
    transactionAmount: number,
    transactionFee: number,
}

export interface IHistory {
    operations: IOperation[],
}

export interface ICredit {
    title: string,
    isActive: number,
    creditRateId: string,
}