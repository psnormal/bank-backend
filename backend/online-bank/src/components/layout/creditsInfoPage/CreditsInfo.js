import React from "react";
import { Card } from 'react-bootstrap';
import CreditsList from "./CreditsList/CreditsList";
import MainUserInfo from "./MainUserInfo/MainUserInfo";

function CreditsInfo(props) {
    return (
        <>
            <Card>
                <Card.Body>
                    <MainUserInfo name={props.infoOnPage.name} lastname={props.infoOnPage.lastname} creditRating={props.infoOnPage.creditRating} />
                    <CreditsList credits={ props.infoOnPage.credits}/>
                </Card.Body>
            </Card>
        </>
    )
}

export default CreditsInfo;