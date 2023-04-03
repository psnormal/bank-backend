import React, { useCallback, useMemo, useState } from 'react';
import API from '../../api/api';
import { userInfo } from '../../constData/constData';

const Operation: React.FC = () => {
    const [numberAccount, setNumberAccount] = useState<string>();
    const [transactionAmount, setTransactionAmount] = useState<string>();

    var amqp = require('amqplib/callback_api');
    
    const plusMoney = async () => {
        // const date = (new Date()).toISOString();
        // if (numberAccount && transactionAmount) {
        //     await API.createOperation(userInfo.userId, parseInt(numberAccount), date, parseInt(transactionAmount));
        //     setNumberAccount(undefined);
        //     setTransactionAmount(undefined);
        // }

        amqp.connect('amqp://localhost', function(error0: any, connection: any) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1: any, channel: any) {
                if (error1) {
                    throw error1;
                }
                var queue = 'accounts-operations';
                var msg = {
                    userID: userInfo.userId,
                    accountNumber: numberAccount,
                    dateTime: (new Date()).toISOString(),
                    transactionAmount: transactionAmount,
                } || "Hello World!";
        
                channel.assertQueue(queue, {
                    durable: true,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null,
                });
                channel.sendToQueue(queue, Buffer.isBuffer(msg), {
                    persistent: true
                });
                console.log(msg);
            });
            setTimeout(function() {
                connection.close();
                process.exit(0);
            }, 500);
        });
    };

    const minusMoney = async () => {
        const date = (new Date()).toISOString();
        if (numberAccount && transactionAmount) {
            await API.createOperation(userInfo.userId, parseInt(numberAccount), date, -parseInt(transactionAmount));
            setNumberAccount(undefined);
            setTransactionAmount(undefined);
        }
    };

    const onChangeNumberAccount = useCallback((value: string) => {
        setNumberAccount(value);
    }, []);

    const onChangeTransactionAmount = useCallback((value: string) => {
        setTransactionAmount(value);
    }, []);

    const inputBlock = useMemo(() => {
        return (
            <>
                <input 
                    type='text'
                    title='Введите номер счета'
                    value={numberAccount} 
                    onChange={(event) => {
                        onChangeNumberAccount(event.target.value);
                    }}
                    placeholder='Введите номер счета'
                    style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
                />
                <input 
                    type='text'
                    title='Введите сумму'
                    value={transactionAmount} 
                    onChange={(event) => {
                        onChangeTransactionAmount(event.target.value);
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
                onClick={plusMoney} 
                title='Внести деньги'
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Внести деньги</button>
            <button 
                onClick={minusMoney} 
                title='Снять деньги'
                style={{ background: '#87CEFA', borderWidth: 2, marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Снять деньги</button>
        </blockquote>
    );
}

export default Operation;