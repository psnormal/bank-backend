import React from "react";
import { Link } from 'react-router-dom';
import { ListGroup, Container, Row, Col, Nav} from 'react-bootstrap';

function ClientAccountItem(props) {
    return (
        <>
            <Nav.Link as={Link} to={`/account/${props.account.accountNumber}/${props.userId}`}>
                <ListGroup.Item className="px-6 py-3">
                    <Container>
                        <Row className="justify-content-between">
                            <Col >Номер счета: {props.account.accountNumber}</Col>
                            <Col>
                                {
                                    props.account.type === 0
                                        ? <span>Дебетовый счет</span>
                                        : <span>Кредитный счет</span>

                                }
                            </Col>
                            <Col>
                                {
                                    props.account.state === 0
                                        ? <span>Открыт</span>
                                        : <span>Закрыт</span>

                                }
                            </Col>
                            <Col className="text-center">Баланс: {props.account.balance}</Col>
                        </Row>
                    </Container>
                </ListGroup.Item>
            </Nav.Link>
        </>
    )

}

export default ClientAccountItem;