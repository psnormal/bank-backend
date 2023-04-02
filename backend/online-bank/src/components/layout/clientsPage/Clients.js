import React from "react";
import { ListGroup } from 'react-bootstrap';
import ClientItem from "./ClientItem";

function Clients(props) {
    return (
        <>
            <ListGroup className='mb-4 mx-auto'>
                {
                    props.clientPage.clients.map((client) => {
                        return <ClientItem client={client} onBlockButtonClick={props.blockAClient} key={client.userID} />
                    })
                }
            </ListGroup>
        </>
    );

}

export default Clients;