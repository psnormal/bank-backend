import React from "react";
import { connect } from 'react-redux';
import { createNewCreditRateThunkCreator, updateNewCreditRateActionCreator } from "../../../store/reducers/CreditsReducer";
import NewCreditRateCreationForm from "./NewCrediRateCreationForm";


class NewCreditRateCreationFormContainer extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <>
                <NewCreditRateCreationForm newCreditRate={this.props.newCreditRate}
                    createCreditRate={this.props.createNewCreditRateThunkCreator}
                    updateCreditRate={this.props.updateNewCreditRateActionCreator} />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        newCreditRate: state.creditPage.newCreditRate
    }
}


export default connect(mapStateToProps, { createNewCreditRateThunkCreator, updateNewCreditRateActionCreator })(NewCreditRateCreationFormContainer)