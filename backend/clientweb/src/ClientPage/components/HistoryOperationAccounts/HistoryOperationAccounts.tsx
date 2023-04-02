import React, { useCallback, useMemo, useState } from 'react';
import API from '../../api/api';
import { IHistory } from '../../api/types';
import { userAccounts, userInfo } from '../../constData/constData';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const titleData = {
    first: 'Показать историю операций счета клиента: ',
    second: 'История операций счета № ', 
    third: 'Неправильно введен номер счета'
}

const HistoryOperationAccounts: React.FC = () => {
    const [title, setTitle] = useState<string>(titleData.first);
    const [numberAccount, setNumberAccount] = useState<number>();
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [history, setHistory] = useState<IHistory>();

    const [connection, setConnection] = useState<HubConnection>();
    const [historyOperations, setHistoryOperations] = useState<any>([]);

    const operations = async (dateTime: any, transactionAmount: any) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('https://localhost')
                .configureLogging(LogLevel.Information)
                .build();

            connection.on('GetHistory', (dateTime, transactionAmount) => {
                setHistoryOperations((historyOperations: any) => [...historyOperations, { dateTime, transactionAmount }]);
            });

            await connection.start();
            await connection.invoke('SendHistory', numberAccount);
            setConnection(connection);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(operations);

    const onChange = useCallback((value: number) => {
        setNumberAccount(value);
    }, []);
    
    const inputBlock = useMemo(() => {
        return (
            <input 
                type='number'
                value={numberAccount} 
                onChange={(event) => {
                    onChange(parseInt(event.target.value));
                }}
                placeholder='Введите номер'
                style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
            />
        );
    }, []);

    const show = async () => {
        setShowInfo(true);
        setTitle(titleData.second + numberAccount);

        if (numberAccount) {
            const result = await API.getHistory(userInfo.userId, numberAccount);
            setHistory(result);
        }
        else {
            setTitle(titleData.third);
        }
    };

    const hide = useCallback(() => {
        setTitle(titleData.first);
        setShowInfo(false);
        setNumberAccount(undefined);
        setHistory(undefined);
    }, []);


    return (
        <blockquote style={{ background: '#FFFFFF', border: 'solid', borderColor: '#000080', padding: '10px' }}>
            <p style={{ margin: '0px' }}>{title}</p>
            {!showInfo && (inputBlock)}
            {!showInfo && (<button 
                disabled={numberAccount ? false : true}
                onClick={show} 
                title='Показать'
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Показать</button>)}
            {(showInfo) && (<button
                onClick={hide} 
                title='Скрыть' 
                style={{ background: '#DCDCDC', borderWidth: 2, marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Скрыть</button>)}
            {showInfo && (<p style={{ margin: '0px' }}>Номер счета: {numberAccount}</p>)}
            {showInfo && (history?.operations.map(item => {
                return (<p style={{ margin: '0px'}}>Дата операции: {item.dateTime}, сумма: {item.transactionAmount}</p>)
            }))}
        </blockquote>
    );
}

export default HistoryOperationAccounts;