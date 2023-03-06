import React, { useCallback, useMemo, useState } from 'react';
import { userInfo } from '../../constData/constData';
import API from '../../api/api';

const titleData = {
    first: 'Закрыть счет ',
    second: 'У вас есть деньги на счете, предлагаем их снять ', 
    third: 'Неправильно введен номер счета',
    forth: 'Вы уверены, что хотите закрыть счет',
}

const titleBtnData = {
    first: 'Закрыть',
    second: 'Снять', 
    third: 'Нет',
    forth: 'Да',
}

const ClosedAccount: React.FC = () => {
    const [title, setTitle] = useState<string>(titleData.first);

    const [numberAccount, setNumberAccount] = useState<number>();
    const [balanceAccount, setBalanceAccount] = useState<number>();


    const onChange = useCallback((value: string) => {
        setNumberAccount(parseInt(value));
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

    const close = async () => {
        if (numberAccount) {
            const res = await API.getAccount(userInfo.userId, numberAccount);
            const balance = res.balance;
            setBalanceAccount(balance);
            if (balance === 0) {
                setTitle(titleData.forth);
            } else {
                setTitle(titleData.second);
            }
        }
    };

    const withdrawal = async () => {
        const date = (new Date()).toISOString();
        if (numberAccount && balanceAccount) {
            await API.createOperation(userInfo.userId, numberAccount, date, balanceAccount);
            setTitle(titleData.forth);
        }
    };

    const ok = async () => {
        if (numberAccount) {
            await API.changeAccountState(userInfo.userId, 1, numberAccount);
        }
    };

    const cansel = () => {
        setTitle(titleData.first);
    };

    return (
        <blockquote style={{ background: '#FFFFFF', border: 'solid', borderColor: '#000080', padding: '10px', marginTop: '10px' }}>
            <p style={{ margin: '0px' }}>{title}</p>
            {(title === titleData.first) && (inputBlock)}
            {title === titleData.first && (<button 
                onClick={close} 
                title={titleBtnData.first}
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >{titleBtnData.first}</button>)}

            {title === titleData.forth && (<button 
                onClick={ok} 
                title={titleBtnData.forth}
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >{titleBtnData.forth}</button>)}

            {title === titleData.second && (<button 
                onClick={withdrawal} 
                title={titleBtnData.second}
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >{titleBtnData.second}</button>)}

            {title !== titleData.first && (<button 
                onClick={cansel} 
                title={titleBtnData.third}
                style={{ background: '#DCDCDC', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >{titleBtnData.third}</button>)}
        </blockquote>
    );
}

export default ClosedAccount;