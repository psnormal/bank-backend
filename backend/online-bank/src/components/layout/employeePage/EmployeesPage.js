import React from "react";
import Employees from "./Employees";
import EmployeesContainer from "./EmployeesContainer";
import NewEmployeeCreationForm from "./NewEmployeeCreationForm";
import NewEmployeeCreationFormContainer from "./NewEmployeeCreationFormContainer";

function EmployeesPage() {
    return (
        <> 
        <NewEmployeeCreationFormContainer/>
        {/* <NewEmployeeCreationForm/> */}
        <EmployeesContainer/>
        </>
    )
}

export default EmployeesPage