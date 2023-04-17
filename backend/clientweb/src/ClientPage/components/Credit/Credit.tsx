import React, { useCallback, useState, useEffect } from 'react';
import API from '../../api/api';
import { ICredit } from '../../api/types';
import { userInfo } from '../../constData/constData';

const Credit: React.FC = () => {
    const [creditRates, setCreditRates] = useState<ICredit[]>();
    const [credit, setCredit] = useState<string>();
    const [loanAmount, setLoanAmount] = useState<number>();
    const [paymentTerm, setPaymentTerm] = useState<number>();

    useEffect(() => {
        (async () => {
            if (!creditRates) {
                const credit = await API.getCreditRates();
                setCreditRates(credit);
                setCredit(credit[0].creditRateId);
            }
        })() 
    }, []);

    const onChangeCredit = useCallback((value: string) => {
        setCredit(value);
    }, []);

    const onChangeLoanAmount = useCallback((value: number) => {
        setLoanAmount(value);
    }, []);

    const onChangePaymentTerm = useCallback((value: number) => {
        setPaymentTerm(value);
    }, []);
    
    const takeCredit = async () => {
        if (credit && paymentTerm && loanAmount) {
            const creditRateId = creditRates?.filter(item => item.title === credit);
            if (creditRateId?.[0] && creditRateId?.[0].creditRateId) {
                console.log(creditRateId?.[0].creditRateId);
                await API.takeCredit(userInfo.userId, creditRateId[0].creditRateId, paymentTerm, loanAmount);
            }
        }
        setLoanAmount(undefined);
        setPaymentTerm(undefined);
    };

    return (
        <blockquote style={{ background: '#FFFFFF', border: 'solid', borderColor: '#000080', padding: '10px', marginTop: '10px' }}>
            <p style={{ margin: '0px' }}>Взять кредит</p>
            <select 
                name="select" 
                onChange={(event) => {
                    onChangeCredit(event.target.value);
                }}
                style={{ marginBlock: '10px', padding: '5px', marginRight: '10px' }}>
                {creditRates?.map(item => {
                    return (<option value={item.creditRateId}>{item.title}</option>);
                })}
            </select>
            <input
                type='number'
                value={loanAmount} 
                onChange={(event) => {
                    onChangeLoanAmount(parseInt(event.target.value));
                }}
                title='Введите сумму кредита'
                placeholder='Введите сумму кредита'
                style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
            />
            <input
                type='number'
                value={paymentTerm} 
                onChange={(event) => {
                    onChangePaymentTerm(parseInt(event.target.value));
                }}
                title='Введите срок кредита'
                placeholder='Введите срок кредита'
                style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
            />
            <button
                disabled={credit && loanAmount && paymentTerm ? false : true}
                onClick={takeCredit} 
                title='Взять кредит'
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Взять кредит</button>
        </blockquote>
    );
}

export default Credit;