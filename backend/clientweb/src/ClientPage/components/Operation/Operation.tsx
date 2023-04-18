import React, { useCallback, useMemo, useState } from 'react';
import API from '../../api/api';
import { userInfo } from '../../constData/constData';

const Operation: React.FC = () => {
    const [numberAccount, setNumberAccount] = useState<number>();
    const [transactionAmount, setTransactionAmount] = useState<number>();
    
    const plusMoney = async () => {
         const date = (new Date()).toISOString();
         if (numberAccount && transactionAmount) {
             setNumberAccount(undefined);
             setTransactionAmount(undefined);
             await API.createOperation(userInfo.userId, numberAccount, date, transactionAmount);
         }
    };

    const minusMoney = async () => {
        const date = (new Date()).toISOString();
        if (numberAccount && transactionAmount) {
            setNumberAccount(undefined);
            setTransactionAmount(undefined);
            await API.createOperation(userInfo.userId, numberAccount, date, -transactionAmount);
        }
    };

    const onChangeNumberAccount = useCallback((value: number) => {
        setNumberAccount(value);
    }, []);

    const onChangeTransactionAmount = useCallback((value: number) => {
        setTransactionAmount(value);
    }, []);

    const inputBlock = useMemo(() => {
        return (
            <>
                <input 
                    type='number'
                    title='Введите номер счета'
                    value={numberAccount} 
                    onChange={(event) => {
                        onChangeNumberAccount(event.target.value as unknown as number);
                    }}
                    placeholder='Введите номер счета'
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
            <p style={{ margin: '0px' }}>Операции по счету</p>
            {inputBlock}
            <button 
                disabled={!numberAccount || !transactionAmount}
                onClick={plusMoney} 
                title='Внести деньги'
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Внести деньги</button>
            <button 
                disabled={!numberAccount || !transactionAmount}
                onClick={minusMoney} 
                title='Снять деньги'
                style={{ background: '#87CEFA', borderWidth: 2, marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Снять деньги</button>
        </blockquote>
    );
}

export default Operation;