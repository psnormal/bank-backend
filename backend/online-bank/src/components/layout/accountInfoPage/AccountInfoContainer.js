import React from "react";
import { connect } from 'react-redux';
import withRouter from "../../../hoc/withRouter";
import {getAccountInfoThunkCreator, joinToAccountHistory, setAccountUserIdActionCreator} from "../../../store/reducers/AccountInfoReducer";
import AccountInfo from "./AccountInfo";

class AccountInfoContainer extends React.Component {
    componentDidMount() {
        let accountId = this.props.router.params.accountId;
        let userId = this.props.router.params.userId;

        this.props.getAccountInfo(userId, accountId);
        this.props.setAccountUserId(userId);
        this.props.joinToAccountHistory(this.props.accountInfo.connection, userId, accountId);
    }

    componentWillUnmount() {
        this.closeConnection();
    }

    closeConnection = async () => {
        try {
            await this.props.accountInfo.connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

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
    setAccountUserId: setAccountUserIdActionCreator,
    joinToAccountHistory
})
    (AccountInfoContainerWithUrl)