import React from "react";
import {ListGroup, Card, Row, Col, Button} from 'react-bootstrap';

function EmployeeItem(props) {
    return (
    <>
    <ListGroup.Item className="px-6 py-3">
        <Row className="justify-content-between align-items-center">
            <Col>
                 <span>{props.emp.name} {props.emp.lastname}</span> 
            </Col>
            <Col xs="auto">
                <Button variant="danger" className="text-wrap float-end"
                         onClick={(e) => props.onBlockButtonClick(props.emp.userID) }>
                    Заблокировать
                </Button>
            </Col>
        </Row>
    </ListGroup.Item>
    </>
    )
    
}

export default EmployeeItem;