import React from "react";
import {Form, Button, Card} from 'react-bootstrap';
import { useDispatch } from "react-redux";

function NewEmployeeCreationForm(props) {
    const nameRef = React.createRef();
    const lastnameRef = React.createRef();
    const passwordRef = React.createRef();
    const dispatch = useDispatch();

    const onChange =()=>{
        dispatch(props.setNewEmployeeActionCreator({
            name: nameRef.current.value,
            lastname: lastnameRef.current.value,
            password: passwordRef.current.value,
        }))
    }
    const onSubmit =()=> {
        console.log(nameRef.current.value);
        props.createNewEmployeeThunkCreator(nameRef.current.value, lastnameRef.current.value, passwordRef.current.value);
    }
    return (
        <Card className="mb-4 mx-auto" style={{ width: '800px' }}>
            <Card.Body>
                <h3 className="text-center">Создать нового сотрудника</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="Введите имя сотрудника"
                                      value={props.newEmployee.name} 
                                      ref={nameRef}
                                      onChange={onChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="Введите фамилию сотрудника" 
                                      value={props.newEmployee.lastname} 
                                      ref={lastnameRef}
                                      onChange={onChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" 
                                      placeholder="Введите пароль" 
                                      value={props.newEmployee.password} 
                                      ref={passwordRef}
                                      onChange={onChange}/>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={onSubmit}>
                        Создать
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default NewEmployeeCreationForm;