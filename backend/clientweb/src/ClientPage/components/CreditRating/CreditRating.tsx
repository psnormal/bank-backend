import React, { useEffect, useState } from 'react';
import API from '../../api/api';
import { userInfo } from '../../constData/constData';

const CreditRating: React.FC = () => {
    const [rating, setRating] = useState<number>();

    useEffect(() => {
        (async () => {
            if (!rating) {
                const res = await API.getCreditRating(userInfo.userId);
                setRating(res);
            }
        })()
    }, []);

    return (
        <blockquote style={{ background: '#FFFFFF', border: 'solid', borderColor: '#000080', padding: '10px', marginTop: '0px' }}>
            Кредитный рейтинг клиента: {rating}
        </blockquote>
    );
}

export default CreditRating;