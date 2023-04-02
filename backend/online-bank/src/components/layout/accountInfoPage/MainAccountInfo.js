import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

function MainAccountInfo(props) {
    return (
        <>
            <Container className="mb-4">
                <h5>Информация о счете:</h5>
                <Row className="justify-content-between">
                    <Col xs="auto">Номер счета: {props.account.accountNumber}</Col>
                    <Col xs="auto">
                        {
                            props.account.type === 0
                                ? <span>Дебетовый счет</span>
                                : <span>Кредитный счет</span>

                        }
                    </Col>
                    <Col xs="auto">
                        {
                            props.account.state === 0
                                ? <span>Открыт</span>
                                : <span>Закрыт</span>

                        }
                    </Col>
                    <Col xs="auto">Баланс: {props.account.balance}</Col>
                </Row>
            </Container>
        </>

    )
}

export default MainAccountInfo;