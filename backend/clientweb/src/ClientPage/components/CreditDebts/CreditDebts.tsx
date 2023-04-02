import React, { useCallback, useEffect, useState } from 'react';
import API from '../../api/api';
import { IOverduePayment, ICreditUsers } from '../../api/types';
import { userInfo } from '../../constData/constData';

const titleData = {
    first: 'Показать задолженности по кредиту: ',
    second: 'Задолженности по кредиту', 
    third: 'Неправильно введен номер кредитного счета'
}

const CreditDebts: React.FC = () => {
    const [creditUsers, setCreditUsers] = useState<ICreditUsers[]>();
    const [credit, setCredit] = useState<string>();

    const [title, setTitle] = useState<string>(titleData.first);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [debts, setDebts] = useState<IOverduePayment[]>();

    useEffect(() => {
        (async () => {
            if (!creditUsers) {
                const credit = await API.getUserCredits(userInfo.userId);
                setCreditUsers(credit);
                setCredit(credit.creditID);
            }
        })() 
    }, []);

    const onChangeCredit = useCallback((value: string) => {
        setCredit(value);
    }, []);

    const show = async () => {
        setShowInfo(true);
        setTitle(titleData.second);

        if (credit) {
            const result = await API.getOverduePayments(userInfo.userId, credit);
            setDebts(result);
        }
        else {
            setTitle(titleData.third);
        }
    };

    const hide = useCallback(() => {
        setTitle(titleData.first);
        setShowInfo(false);
        setDebts(undefined);
    }, []);


    return (
        <blockquote style={{ background: '#FFFFFF', border: 'solid', borderColor: '#000080', padding: '10px' }}>
            <p style={{ margin: '0px' }}>{title}</p>
            {!showInfo && (
                <select 
                    name="select" 
                    onChange={(event) => {
                        onChangeCredit(event.target.value);
                    }}
                    style={{ marginBlock: '10px', padding: '5px', marginRight: '10px' }}>
                    {creditUsers?.map(item => {
                        return (<option value={item.creditID}>{item.creditRateTitle}</option>);
                    })}
                </select>)}
            {!showInfo && (<button 
                disabled={credit ? false : true}
                onClick={show} 
                title='Показать'
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Показать</button>)}
            {(showInfo) && (<button
                onClick={hide} 
                title='Скрыть' 
                style={{ background: '#DCDCDC', borderWidth: 2, marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Скрыть</button>)}
            {showInfo && (<p style={{ margin: '0px' }}>Кредит ID: {credit}</p>)}
            {showInfo && (debts?.map(item => {
                return (<p style={{ margin: '0px'}}>Дата: {item.paymentDate}, сумма: {item.payoutAmount}</p>)
            }))}
        </blockquote>
    );
}

export default CreditDebts;