import React from "react"
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

function CreditOverduePaymentsItem(props) {
    let getFormattedDate = (datetime) => {
        var date = new Date(datetime);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hours = date.getHours();
        let mins = date.getMinutes().toString().padStart(2, '0');
        let secs = date.getSeconds().toString().padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${mins}:${secs}`
    }
    return (
        <>
            <ListGroup.Item className="px-6 py-3">
                <Container>
                    <Row className="justify-content-between">
                        <Col xs="auto">Дата платежа: {getFormattedDate(props.payment.paymentDate)}</Col>
                        <Col xs="auto">Сумма платежа: {props.payment.payoutAmount}</Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        </>
    )
}

export default CreditOverduePaymentsItem;