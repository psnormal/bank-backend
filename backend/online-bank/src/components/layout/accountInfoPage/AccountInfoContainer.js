import React from "react";
import { connect } from 'react-redux';
import withRouter from "../../../hoc/withRouter";
import { getAccountInfoThunkCreator, getOperationsAndPageInfoThunkCreator, setAccountUserIdActionCreator} from "../../../store/reducers/AccountInfoReducer";
import AccountInfo from "./AccountInfo";

class AccountInfoContainer extends React.Component {
    componentDidMount() {
        let accountId = this.props.router.params.accountId;
        let currentPage = this.props.router.params.currentPage;
        let userId = this.props.router.params.userId;

        this.props.getAccountInfo(userId, accountId);
        this.props.getOperationsAndPageInfo(userId, accountId, currentPage);
        this.props.setAccountUserId(userId);
    }
    onPageChanged = (userId, accountId, currentPage) => {
        this.props.getOperationsAndPageInfo(userId, accountId, currentPage)
    }

    render() {
        return (
            <>
                <AccountInfo {...this.props} onPageChanged={ this.onPageChanged}/>
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
    getOperationsAndPageInfo: getOperationsAndPageInfoThunkCreator,
    setAccountUserId: setAccountUserIdActionCreator
})
    (AccountInfoContainerWithUrl)