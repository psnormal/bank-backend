export interface IAccount {
    accountNumber: number,
    balance: number,
    state: number,
    type: number,
}

export interface IOperation {
    accountNumber: number,
    dateTime: string,
    transactionAmount: number,
    transactionFee: number,
    senderAccountNumber: number,
    recipientAccountNumber: number,
}

export interface IHistory {
    operations: IOperation[],
}

export interface ICredit {
    title: string,
    isActive: number,
    creditRateId: string,
}

export interface IOverduePayment {
    creditPaymentId: string,
    creditId: string,
    payoutAmount: number,
    paymentDate: string,
}

export interface ICreditUsers {
    creditID: string;
    creditRateTitle: string,
    intersestRate: number,
    status: number,
    loanBalance: number,
}