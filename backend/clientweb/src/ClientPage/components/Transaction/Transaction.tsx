import React, { useCallback, useMemo, useState } from 'react';
import API from '../../api/api';
import { userInfo } from '../../constData/constData';

const Transaction: React.FC = () => {
    const [senderAccountNumber, setSenderNumberAccount] = useState<number>();
    const [recipientAccountNumber, setRecipientAccountNumber] = useState<number>();
    const [transactionAmount, setTransactionAmount] = useState<number>();
    
    const plusMoney = async () => {
         const date = (new Date()).toISOString();
        if (senderAccountNumber && transactionAmount && recipientAccountNumber) {
             await API.createTransaction(userInfo.userId, senderAccountNumber, recipientAccountNumber, date, transactionAmount);
             setSenderNumberAccount(undefined);
             setTransactionAmount(undefined);
         }
    };

    const onChangeSenderNumberAccount = useCallback((value: number) => {
        setSenderNumberAccount(value);
    }, []);
    
    const onChangeRecipientNumberAccount = useCallback((value: number) => {
        setRecipientAccountNumber(value);
    }, []);

    const onChangeTransactionAmount = useCallback((value: number) => {
        setTransactionAmount(value);
    }, []);

    const inputBlock = useMemo(() => {
        return (
            <>
                <input 
                    type='number'
                    title='Введите номер счета отправителя'
                    value={senderAccountNumber} 
                    onChange={(event) => {
                        onChangeSenderNumberAccount(event.target.value as unknown as number);
                    }}
                    placeholder='Cчет отправителя'
                    style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
                />
                <input 
                    type='number'
                    title='Введите номер счета получателя'
                    value={recipientAccountNumber} 
                    onChange={(event) => {
                        onChangeRecipientNumberAccount(event.target.value as unknown as number);
                    }}
                    placeholder='Cчет получателя'
                    style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
                />
                <input 
                    type='number'
                    title='Введите сумму'
                    value={transactionAmount} 
                    onChange={(event) => {
                        onChangeTransactionAmount(event.target.value as unknown as number);
                    }}
                    placeholder='Введите сумму'
                    style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
                />
            </>
        );
    }, []); 

    return (
        <blockquote style={{ background: '#FFFFFF', border: 'solid', borderColor: '#000080', padding: '10px' }}>
            <p style={{ margin: '0px' }}>Операции между счетами</p>
            {inputBlock}
            <button 
                disabled={!senderAccountNumber || !recipientAccountNumber || !transactionAmount}
                onClick={plusMoney} 
                title='Перевести деньги'
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Перевести</button>
        </blockquote>
    );
}

export default Transaction;