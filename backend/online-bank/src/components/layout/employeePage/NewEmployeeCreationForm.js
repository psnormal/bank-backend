import React from "react";
import {Form, Button, Card} from 'react-bootstrap';

function NewEmployeeCreationForm(props) {
    const nameRef = React.createRef();
    const lastnameRef = React.createRef();
    const passwordRef = React.createRef();

    return (
        <Card className="mb-4 mx-auto" style={{ width: '800px' }}>
            <Card.Body>
                <h3 className="text-center">Создать нового сотрудника</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text"
                            placeholder="Введите имя сотрудника"
                            defaultValue={props.newEmployee.name}
                            ref={nameRef}
                            onChange={() => {
                                props.setEmployee({
                                    name: nameRef.current.value,
                                    lastname: lastnameRef.current.value,
                                    password: passwordRef.current.value
                                })
                            }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control type="text" 
                            placeholder="Введите фамилию сотрудника" 
                            defaultValue={props.newEmployee.lastname}
                            ref={lastnameRef}
                            onChange={() => {
                                props.setEmployee({
                                    name: nameRef.current.value,
                                    lastname: lastnameRef.current.value,
                                    password: passwordRef.current.value
                                })
                            }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" 
                            placeholder="Введите пароль" 
                            defaultValue={props.newEmployee.password} 
                            ref={passwordRef}
                            onChange={() => {
                                props.setEmployee({
                                    name: nameRef.current.value,
                                    lastname: lastnameRef.current.value,
                                    password: passwordRef.current.value
                                })
                            }}/>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={(e) => { props.createEmployee(nameRef.current.value, lastnameRef.current.value, passwordRef.current.value)}}>
                        Создать
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default NewEmployeeCreationForm;