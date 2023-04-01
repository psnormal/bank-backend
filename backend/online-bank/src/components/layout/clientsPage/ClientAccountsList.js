import React from "react";
import { ListGroup} from 'react-bootstrap';
import ClientAccountItem from "./ClientAccountItem";

function ClientAccountsList(props) {
    return (
        <>
            {props.accounts.length === 0
                ? <>
                    <h6>У клиента нет счетов</h6>
                  </>
                : <>
                    <h6>Счета клиента:</h6>
                    <ListGroup>
                        {
                            props.accounts.map((account) => {
                                return <ClientAccountItem account={account} key={account.accountNumber} userId={ props.userId}/>
                            })
                        }
                    </ListGroup>
                  </>
            }
        </>
    )

}

export default ClientAccountsList;