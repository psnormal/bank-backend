import React from "react";
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import ClientAccountsList from "./ClientAccountsList";

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
                            disabled={props.client.status == 1}
                            onClick={(e) => props.onBlockButtonClick(props.client.userID)}>
                            Заблокировать
                        </Button>
                    </Col>
                </Row>
                <ClientAccountsList accounts={props.client.accounts} userId={props.client.userID}/>
            </ListGroup.Item>
        </>
    )

}

export default ClientItem;