import React from "react";
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

function OperationItem(props) {
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
                    <Row className="justify-content-between align-items-center">
                        <Col xs="auto">
                            <p className="mb-1">Дата: {getFormattedDate(props.operation.dateTime)}</p>
                            {
                                (props.operation.type != "Внесение средств" && props.operation.type != "Списание средств" && props.operation.senderAccountNumber === 0) &&
                                <p className="mb-1">
                                        {props.operation.accountNumber}
                                        <span className="mx-2"><FontAwesomeIcon icon={faArrowRightLong}/> </span>
                                        {props.operation.recipientAccountNumber}
                                </p>
                            }
                            {
                                (props.operation.type != "Внесение средств" && props.operation.type != "Списание средств" && props.operation.recipientAccountNumber === 0) &&
                                <p className="mb-1 fw-weight-bold">
                                        {props.operation.senderAccountNumber}
                                        <span className="mx-2"><FontAwesomeIcon icon={faArrowRightLong} /> </span>
                                        {props.operation.accountNumber}
                                </p>      
                            }
                            <p className="text-muted mb-0">{props.operation.type}</p>
                        </Col>
                        <Col xs="auto">
                            <span className="fs-5">{props.operation.transactionAmount} р.</span>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        </>
    )

}

export default OperationItem;