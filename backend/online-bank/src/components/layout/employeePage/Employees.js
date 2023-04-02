import React from "react";
import EmployeeItem from "./EmployeeItem"
import {ListGroup} from 'react-bootstrap';

function Employees(props) {
    return (
        <> 
        <ListGroup className='mb-4'>
            {
                props.employeePage.employees.map((emp) => {
                    return <EmployeeItem emp={emp} onBlockButtonClick={props.blockAnEmployee} key={emp.userID}/>
                })
            }
        </ListGroup>
        </>
    );

}

export default Employees;