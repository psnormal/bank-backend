import React, { useCallback, useState } from 'react';
import API from '../../api/api';
import { ICredit } from '../../api/types';
import { userInfo } from '../../constData/constData';

const data = [
    {
        title: '123',
        creditRateId: '0',
    },
    {
        title: '134',
        creditRateId: '1',
    },
    {
        title: '245',
        creditRateId: '2',
    }
]

const Credit: React.FC = () => {
    const [numberAccount, setNumberAccount] = useState<string>();
    const [creditRates, setCreditRates] = useState<ICredit[]>();
    const [credit, setCredit] = useState<string>();
    const [loanAmount, setLoanAmount] = useState<number>();
    const [paymentTerm, setPaymentTerm] = useState<number>();
    const [date, setDate] = useState<string>();


    const onChangeCredit = useCallback((value: string) => {
        console.log(value);
        setCredit(value);
    }, []);

    const onChangeLoanAmount = useCallback((value: number) => {
        console.log(value);
        setLoanAmount(value);
    }, []);

    const onChangePaymentTerm = useCallback((value: number) => {
        console.log(value);
        setPaymentTerm(value);
    }, []);

    const onChangeDate = useCallback((value: string) => {
        console.log(new Date(value).toISOString());
        setDate(value);
    }, []);

    const createAccount = async () => {
        const result = await API.createAccount(userInfo.userId, 1);
        setNumberAccount(result.accountNumber);
        const credit = await API.getCreditRates();
        setCreditRates(credit);
        setCredit(credit.creditRateId);

        //setCredit(data[0].creditRateId);
        //setCreditRates(data);
        //setNumberAccount('12');
    };
    
    const takeCredit = async () => {
        if (credit && numberAccount && paymentTerm && loanAmount && date) {
            const creditRateId = creditRates?.filter(item => item.title === credit);
            console.log(creditRateId?.[0]);
            console.log('gff');
            if (creditRateId?.[0] && creditRateId?.[0].creditRateId) {
                console.log(creditRateId?.[0].creditRateId);
                await API.takeCredit(userInfo.userId, creditRateId[0].creditRateId, parseInt(numberAccount), date, paymentTerm, loanAmount);
            }
            
        }

        setNumberAccount(undefined);
        setLoanAmount(undefined);
        setPaymentTerm(undefined);
        setCredit(undefined);
    };

    return (
        <blockquote style={{ background: '#FFFFFF', border: 'solid', borderColor: '#000080', padding: '10px', marginTop: '10px' }}>
            <p style={{ margin: '0px' }}>?????????? ????????????</p>
            {!numberAccount && (<button
                onClick={createAccount} 
                title='?????????????? ?????????????????? ????????'
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >?????????????? ?????????????????? ????????</button>)}
            {numberAccount && 
                (<select 
                    name="select" 
                    onChange={(event) => {
                        onChangeCredit(event.target.value);
                    }}
                    style={{ marginBlock: '10px', padding: '5px', marginRight: '10px' }}>
                    {creditRates?.map(item => {
                        return (<option value={item.creditRateId}>{item.title}</option>);
                    })}
                </select>)}
            {numberAccount && 
                (<input
                    type='number'
                    value={loanAmount} 
                    onChange={(event) => {
                        onChangeLoanAmount(parseInt(event.target.value));
                    }}
                    title='?????????????? ?????????? ??????????????'
                    placeholder='?????????????? ?????????? ??????????????'
                    style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
                />)}
            {numberAccount && 
                (<input
                    type='number'
                    value={paymentTerm} 
                    onChange={(event) => {
                        onChangePaymentTerm(parseInt(event.target.value));
                    }}
                    title='?????????????? ???????? ??????????????'
                    placeholder='?????????????? ???????? ??????????????'
                    style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
                />)}
            {numberAccount && 
                (<input
                    type='date'
                    value={date} 
                    onChange={(event) => {
                        onChangeDate(event.target.value);
                    }}
                    title='?????????????? ???????? ??????????????????'
                    placeholder='?????????????? ???????? ??????????????????'
                    style={{ marginRight: '10px', marginBlock: '10px', padding: '5px' }}
                />)}
            {numberAccount && (<button
                disabled={credit && loanAmount && paymentTerm ? false : true}
                onClick={takeCredit} 
                title='?????????? ????????????'
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >?????????? ????????????</button>)}
        </blockquote>
    );
}

export default Credit;