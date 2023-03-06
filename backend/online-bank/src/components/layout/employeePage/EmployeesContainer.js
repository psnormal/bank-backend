import React from "react";
import {connect} from 'react-redux'
import { blockAnEmployeeThunkCreator, getEmployeesThunkCreator } from "../../../store/reducers/EmployeesReducer";
import Employees from "./Employees";

class EmployeesContainer extends React.Component {
    componentDidMount() {
        this.props.getEmployeesThunkCreator();
    }

    render() {
        return (
        <>
        <Employees {...this.props}/>
        </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        employeePage: state.employeePage
    }
}

export default connect(mapStateToProps, {getEmployeesThunkCreator, blockAnEmployeeThunkCreator})(EmployeesContainer)