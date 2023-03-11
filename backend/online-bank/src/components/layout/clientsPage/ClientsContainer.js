import React from "react";
import { connect } from 'react-redux'
import { blockAnClientThunkCreator, getClientsThunkCreator } from "../../../store/reducers/ClientsReducer";
import Clients from "./Clients";

class ClientsContainer extends React.Component {
    componentDidMount() {
        this.props.getClientsThunkCreator();
    }

    render() {
        return (
            <>
                <Clients clientPage={this.props.clientPage}
                    blockAClient={this.props.blockAnClientThunkCreator} />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        clientPage: state.clientPage
    }
}

export default connect(mapStateToProps, { blockAnClientThunkCreator, getClientsThunkCreator })(ClientsContainer)