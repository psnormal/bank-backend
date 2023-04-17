import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import OperationItem from './OperationItem';

function AccountOperationsList(props) {
    return (
        <>
            <Container className="mb-2">
                {
                    props.operations.length === 0
                        ? <>
                            <h5>C счетом клиента не производилось никаких операций</h5>
                          </>
                        : <>
                            <h5>Операции счета:</h5>
                            <ListGroup>
                                {
                                    props.operations.map((operation, index) => {
                                        return <OperationItem operation={operation} clientAccountsNums={props.clientAccountsNums} key={index} />
                                    })
                                }
                            </ListGroup>
                          </>

                }
            </Container>
           
        </>

    )
}

export default AccountOperationsList;