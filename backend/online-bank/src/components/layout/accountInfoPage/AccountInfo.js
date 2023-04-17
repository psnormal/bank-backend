import React from "react";
import { Card} from 'react-bootstrap';
import AccountOperationsList from "./AccountOperationsList";
import MainAccountInfo from "./MainAccountInfo";

function AccountInfo(props) {
    return (
        <>
            <Card>
                <Card.Body>
                    <MainAccountInfo account={props.accountInfo.account} />
                    <AccountOperationsList operations={props.accountInfo.operations} clientAccountsNums={props.accountInfo.clientAccounts } />
                </Card.Body>
            </Card>
        </>
    )
}

export default AccountInfo;