import React from "react";
import { connect } from 'react-redux';
import withRouter from "../../../hoc/withRouter";
import { getClientCreditRatingThunkCreator, getClientCreditsThunkCreator, getClientInfoThunkCreator } from "../../../store/reducers/CreditsInfoReducer";
import CreditsInfo from "./CreditsInfo";

class CreditsInfoContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;

        this.props.getClientInfo(userId);
        /*this.props.getClientCreditRating(userId);*/
        this.props.getClientCredits(userId);
    }

    render() {
        return (
            <>
                <CreditsInfo {...this.props} />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        infoOnPage: state.creditsInfoPage
    }
}

let CreditsInfoContainerWithUrl = withRouter(CreditsInfoContainer);
export default connect(mapStateToProps, {
    getClientInfo: getClientInfoThunkCreator,
    getClientCreditRating: getClientCreditRatingThunkCreator,
    getClientCredits : getClientCreditsThunkCreator
})
    (CreditsInfoContainerWithUrl)