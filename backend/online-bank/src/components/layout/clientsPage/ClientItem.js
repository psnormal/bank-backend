import React from "react";
import { ListGroup, Row, Col, Button } from 'react-bootstrap';

function ClientItem(props) {
    return (
        <>
            <ListGroup.Item className="px-6 py-3">
                <Row className="justify-content-between align-items-center">
                    <Col>
                        <span>{props.client.name} {props.client.lastname}</span>
                    </Col>
                    <Col xs="auto">
                        <Button variant="danger" className="text-wrap float-end"
                            onClick={(e) => props.onBlockButtonClick(props.client.userID)}>
                            Заблокировать
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>
        </>
    )

}

export default ClientItem;