import React, { useEffect, useState } from 'react';
import API from '../../api/api';
import { userInfo } from '../../constData/constData';

const ClientInformation: React.FC = () => {
    const [ userName, setUserName ] = useState<string>('');

    useEffect(() => { 
        (async () => {
            if (!userName.length) {
                const client = await API.getClientInformation(userInfo.userId);
                setUserName(client.lastname + ' ' + client.name);
                console.log(client);
                //setUserName(userInfo.fio);
            }
        })()
    }, []);

    return (
        <blockquote style={{ background: '#FFFFFF', border: 'solid', borderColor: '#000080', padding: '10px', marginTop: '0px' }}>
            <h4 style={{ margin: '0px' }}>Информация о клиенте:<br/></h4>
            ФИО: {userName}
        </blockquote>
    );
}

export default ClientInformation;