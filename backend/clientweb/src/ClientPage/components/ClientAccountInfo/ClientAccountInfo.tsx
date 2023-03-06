import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IAccount } from '../../api/types';
import { State, Type } from '../../constant/constant';
import { userAccounts, userInfo } from '../../constData/constData';
import API from '../../api/api';

const titleData = {
    first: 'Показать информацию о конкретном счете клиента: ',
    second: 'Информация о счете № ', 
    third: 'Неправильно введен номер счета'
}

const ClientAccountInfo: React.FC = () => {
    const [title, setTitle] = useState<string>(titleData.first);
    const [numberAccount, setNumberAccount] = useState<string>();
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [account, setAccount] = useState<IAccount[]>();

    const onChange = useCallback((value: string) => {
        setNumberAccount(value);
    }, []);

    const show = async () => {
        setShowInfo(true);
        setTitle(titleData.second + numberAccount);

        if (numberAccount) {
            const accounts = await API.getAccount(userInfo.userId, parseInt(numberAccount));
            setAccount(accounts);
            //setAccount(userAccounts.accounts.filter(item => item.accountNumber.toString() === numberAccount));
        }
        else {
            setTitle(titleData.third);
        }
    };

    const hide = useCallback(() => {
        setTitle(titleData.first);
        setShowInfo(false);
        setNumberAccount(undefined);
        setAccount(undefined);
    }, []);

    const inputBlock = useMemo(() => {
        return (
            <input 
                type='text'
                value={numberAccount} 
                onChange={(event) => {
                    onChange(event.target.value);
                }}
                placeholder='Введите номер'
                style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
            />
        );
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
            {showInfo && (account?.map(item => {
                return (<p style={{ margin: '0px'}}>Номер счета: {item.accountNumber}<br/>Тип счета: {Type[item.type]}<br/>Статус счета: {State[item.state]}<br/>Баланс: {item.balance}</p>)
            }))}
        </blockquote>
    );
}

export default ClientAccountInfo;