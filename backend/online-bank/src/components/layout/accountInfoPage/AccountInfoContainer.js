import React from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { connect } from 'react-redux';
import withRouter from "../../../hoc/withRouter";
import { getAccountInfoThunkCreator, getOperationsThunkCreator, setAccountUserIdActionCreator} from "../../../store/reducers/AccountInfoReducer";
import AccountInfo from "./AccountInfo";

class AccountInfoContainer extends React.Component {
    componentDidMount() {
        let accountId = this.props.router.params.accountId;
        let userId = this.props.router.params.userId;

        this.props.getAccountInfo(userId, accountId);
        /*this.props.getOperations(userId, accountId);*/
        this.props.setAccountUserId(userId);
    }


/*async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(async () => {
    await start();
});

start();*/

    /*joinToAccountHistory = async (accountNumber) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl(operationsHubUrl)
                .configureLogging(LogLevel.Information)
                .build();

        }
        catch (e) {
            console.log(e);
        }
    }*/

    render() {
        return (
            <>
                <AccountInfo {...this.props} />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        accountInfo: state.accountInfoPage
    }
}

let AccountInfoContainerWithUrl = withRouter(AccountInfoContainer);
export default connect(mapStateToProps, {
    getAccountInfo: getAccountInfoThunkCreator,
    getOperations: getOperationsThunkCreator,
    setAccountUserId: setAccountUserIdActionCreator
})
    (AccountInfoContainerWithUrl)