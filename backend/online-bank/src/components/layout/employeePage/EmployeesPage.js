import React from "react";
import EmployeesContainer from "./EmployeesContainer";
import NewEmployeeCreationFormContainer from "./NewEmployeeCreationFormContainer";

function EmployeesPage() {
    return (
        <> 
        <NewEmployeeCreationFormContainer/>
        <EmployeesContainer/>
        </>
    )
}

export default EmployeesPage