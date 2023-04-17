import React from "react";
import { Link } from 'react-router-dom';
import { ListGroup, Row, Col, Button, Nav } from 'react-bootstrap';
import ClientAccountsList from "./ClientAccountsList";

function ClientItem(props) {
    return (
        <>
            <ListGroup.Item className="px-6 py-3">
                <Row className="justify-content-between align-items-center">
                    <Col>
                        <p>{props.client.name} {props.client.lastname}</p>
                    </Col>
                    <Col xs="auto">
                        <Button variant="danger" className="text-wrap float-end"
                            disabled={props.client.status == 1}
                            onClick={(e) => props.onBlockButtonClick(props.client.userID)}>
                            Заблокировать
                        </Button>
                    </Col>
                </Row>
                <ClientAccountsList accounts={props.client.accounts} userId={props.client.userID} />
                <Nav.Link as={Link} to={`/credits/${props.client.userID}`}>
                    <Button variant="info" className="mt-3">
                        Кредитная информация
                    </Button>
                </Nav.Link>
            </ListGroup.Item>
        </>
    )

}

export default ClientItem;