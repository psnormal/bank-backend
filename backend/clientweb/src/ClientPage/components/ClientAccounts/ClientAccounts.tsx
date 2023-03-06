import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IAccount } from '../../api/types';
import { Type } from '../../constant/constant';
import { userAccounts, userInfo } from '../../constData/constData';
import API from '../../api/api';

const titleData = {
    first: 'Показать информацию о счетах клиента: ',
    second: 'Информация о счетах клиента: '
}

const UserAccounts: React.FC = () => {
    const [openAccounts, setOpenAccounts] = useState<IAccount[]>();
    const [closedAccounts, setClosedAccounts] = useState<IAccount[]>();

    const [title, setTitle] = useState<string>(titleData.first);

    const show = useCallback(async() => {
        setTitle(titleData.second);

        const accounts = await API.getAccountsAll(userInfo.userId);

        setOpenAccounts(accounts.accounts.filter((item: IAccount) => item.state === 0));
        setClosedAccounts(accounts.accounts.filter((item: IAccount) => item.state === 1));
    }, []);

    const hide = useCallback(() => {
        setTitle(titleData.first);
        setOpenAccounts(undefined);
        setClosedAccounts(undefined);
    }, []);

    return (
        <blockquote style={{ background: '#FFFFFF', border: 'solid', borderColor: '#000080', padding: '10px' }}>
            <p style={{ margin: '0px' }}>{title}</p>
            {(!openAccounts || !closedAccounts) && (<button 
                onClick={show} 
                title='Показать'
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Показать</button>)}
            {(openAccounts || closedAccounts) && (<button
                onClick={hide} 
                title='Скрыть' 
                style={{ background: '#DCDCDC', borderWidth: 2, marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Скрыть</button>)}
            {openAccounts && (<p style={{ margin: '0px' }}>Открытые счета: </p>)}
            <ul style={{ paddingLeft: 15, margin: 0 }}>
                {openAccounts?.map(item => (<li>Номер счета: {item.accountNumber}, тип счета: {Type[item.type]}, баланс: {item.balance}</li>))}
            </ul>
            {closedAccounts && (<p style={{ margin: '0px', marginTop: '10px' }}>Закрытые счета: </p>)}
            <ul style={{ paddingLeft: 15, margin: 0 }}>
                {closedAccounts?.map(item => (<li>Номер счета: {item.accountNumber}, тип счета: {Type[item.type]}</li>))}
            </ul>
        </blockquote>
    );
}

export default UserAccounts;