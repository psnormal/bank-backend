import React from "react"
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import CreditOverduePaymentsList from "./CreditOverduePaymentsList";

function CreditItem(props) {

    return (
        <>
            <ListGroup.Item className="px-6 py-3">
                <Container>
                    <Row className="justify-content-between mb-2">
                        <Col xs="auto">Кредитный тариф: {props.credit.creditRateTitle}</Col>
                        <Col xs="auto">Процентная ставка: {props.credit.interestRate}</Col>
                        <Col xs="auto">
                            {
                                props.credit.status === 0
                                    ? <span>Открыт</span>
                                    : <span>Закрыт</span>

                            }
                        </Col>
                        <Col xs="auto">Сумма кредита: {props.credit.loanBalance}</Col>
                    </Row>
                    <CreditOverduePaymentsList overduePayments={props.credit.overduePayments }/>
                </Container>
            </ListGroup.Item>
        </>
    )
}

export default CreditItem;