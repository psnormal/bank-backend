import React from "react";
import { connect } from 'react-redux'
import { createNewClientThunkCreator, setNewClientActionCreator } from "../../../store/reducers/ClientsReducer";
import NewClientCreationForm from "./NewClientCreationForm";


class NewClientCreationFormContainer extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <>
                <NewClientCreationForm newClient={this.props.newClient}
                    createClient={this.props.createNewClientThunkCreator}
                    setClient={this.props.setNewClientActionCreator} />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        newClient: state.clientPage.newClient
    }
}


export default connect(mapStateToProps, { createNewClientThunkCreator, setNewClientActionCreator })(NewClientCreationFormContainer)