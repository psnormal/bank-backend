import React from "react";
import EmployeeItem from "./EmployeeItem"
import {ListGroup} from 'react-bootstrap';

function Employees(props) {
    return (
        <> 
        <ListGroup>
            {
                props.employeePage.employees.map((emp, idx) => {
                    return <EmployeeItem emp={emp} onBlockButtonClick={props.blockAnEmployeeThunkCreator} key={idx}/>
                })
            }
        </ListGroup>
        </>
    );

}

export default Employees;