import React, { useCallback, useMemo, useState } from 'react';
import API from '../../api/api';
import { Type } from '../../constant/constant';
import { userInfo } from '../../constData/constData';

interface Iapi {
    breed: string,
    country: string,
    origin: string,
    coat: string,
    pattern: string
}

const CreateAccount: React.FC = () => {
    const [typeAccount, setTypeAccount] = useState<number>(0);

    const onChange = useCallback((value: string) => {
        setTypeAccount(parseInt(value));
    }, []);

    const selectBlock = useMemo(() => {
        return (
            <select 
                name="select" 
                onChange={(event) => {
                    onChange(event.target.value);
                }}
                style={{ marginBlock: '10px', padding: '5px', marginRight: '10px' }}>
                <option value='0'>{Type[0]}</option>
                <option value='1'>{Type[1]}</option>
            </select>
              
        );
    }, []); 

    const create = async () => {
        await API.createAccount(userInfo.userId, typeAccount);
    };

    return (
        <blockquote style={{ background: '#FFFFFF', border: 'solid', borderColor: '#000080', padding: '10px', marginTop: '10px' }}>
            <p style={{ margin: '0px' }}>Добавить счет</p>
            {selectBlock}
            <button 
                onClick={create} 
                title='Открыть'
                style={{ background: '#87CEFA', borderWidth: 2, marginRight: '10px', marginBlock: '10px', padding: '5px', borderRadius: 5 }}
            >Открыть</button>
        </blockquote>
    );
}

export default CreateAccount;