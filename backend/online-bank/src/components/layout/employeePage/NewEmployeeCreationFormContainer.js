import React from "react";
import {connect} from 'react-redux'
import { createNewEmployeeThunkCreator, updateNewEmployeeActionCreator } from "../../../store/reducers/EmployeesReducer";
import NewEmployeeCreationForm from "./NewEmployeeCreationForm";


class NewEmployeeCreationFormContainer extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
        <>
        <NewEmployeeCreationForm newEmployee={this.props.newEmployee}
                                 createEmployee={this.props.createNewEmployeeThunkCreator}
                                 updateEmployee={this.props.updateNewEmployeeActionCreator}/>
        </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        newEmployee: state.employeePage.newEmployee
    }
}


export default connect(mapStateToProps, { createNewEmployeeThunkCreator, updateNewEmployeeActionCreator})(NewEmployeeCreationFormContainer)