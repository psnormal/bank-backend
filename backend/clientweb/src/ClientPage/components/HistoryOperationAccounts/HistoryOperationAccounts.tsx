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
    const [connect, setConnect] = useState<HubConnection>();
    const [numberAccount, setNumberAccount] = useState<number>();
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [history, setHistory] = useState<IHistory>();

    const startSocketAndJoinToAccountHistory = async (connection: HubConnection, numberAccount: number) => {
        await connection.start();
        await connection.invoke("JoinToAccountHistory", numberAccount);
    }

    const joinToAccountHistory = (stateConnection: string, userId: string, numberAccount: number) => {
        return (dispatch: (arg0: any) => void) => {
            if (stateConnection === '') {
                try {
                    const connection = new HubConnectionBuilder()
                        .withUrl("https://localhost:7139/operations")
                        .withAutomaticReconnect()
                        .build();
    
                    connection.on("ReceiveMessage", (message) => {
                        console.log(message);
                    });
    
                    connection.on("GetOperations", (data) => {
                        dispatch(setHistory(data.operations))
                    })
    
                    connection.onclose(e => {
                        dispatch(setConnect(connection))
                    });
    
                    startSocketAndJoinToAccountHistory(connection, numberAccount)
                        .then(() => {
                            API.getHistory(userId, numberAccount)
                        });
    
                    dispatch(setConnect(connection))
                } catch (e) { console.log(e) }
            }
        }
    }

    const closeConnection = async () => {
        try {
            await connect?.stop();
        } catch (e) {
            console.log(e);
        }
    }

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
            //const result = await API.getHistory(userInfo.userId, numberAccount);
            //setHistory(result);
            joinToAccountHistory('', userInfo.userId, numberAccount);
        }
        else {
            setTitle(titleData.third);
        }
    };

    const hide = useCallback(() => {
        closeConnection();

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
                return (<p style={{ margin: '0px'}}>Дата операции: {item.dateTime}, сумма: {item.transactionAmount}, 
                    {(item.senderAccountNumber !== 0 && item.recipientAccountNumber !== 0) ? <>счет отправителя: {item.senderAccountNumber}, счет получателя: {item.recipientAccountNumber}</>: undefined}</p>)
            }))}
        </blockquote>
    );
}

export default HistoryOperationAccounts;