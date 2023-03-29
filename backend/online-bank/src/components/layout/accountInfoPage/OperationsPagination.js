import React from "react";
import { Link } from 'react-router-dom';
import { Container, Pagination, Nav } from 'react-bootstrap';

function OperationsPagination(props) {
    let active = props.pageInfo.currentPage === 0 ? 1 : props.pageInfo.currentPage;
    let items = [];
    for (let number = 1; number < props.pageInfo.pageCount + 1; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}
                onClick={() => { props.onPageChanged(props.userId, props.accountNumber, number) }}
            >
                <Nav.Link as={Link} to={`/account/${props.accountNumber}/${number}/${props.userId}`}>
                    {number}
                </Nav.Link>
            </Pagination.Item>
        );
    }

    return (
        <>
            <Container>
                <Pagination>
                    {items}
                </Pagination>
            </Container>
        </>
    )
}

export default OperationsPagination;