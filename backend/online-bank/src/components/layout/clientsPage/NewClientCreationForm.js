import React from "react";
import { Form, Button, Card } from 'react-bootstrap';

function NewClientCreationForm(props) {
    const nameRef = React.createRef();
    const lastnameRef = React.createRef();
    const passwordRef = React.createRef();

    let collectFormData = () => {
        return {
            name: nameRef.current.value,
            lastname: lastnameRef.current.value,
            password: passwordRef.current.value
        }
    }

    return (
        <Card className="mb-4 mx-auto" style={{ maxWidth: '800px' }}>
            <Card.Body>
                <h3 className="text-center">Создать нового клиента</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text"
                            placeholder="Введите имя клиента"
                            value={props.newClient.name}
                            ref={nameRef}
                            onChange={() => {
                                props.updateClient(collectFormData())
                            }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control type="text"
                            placeholder="Введите фамилию клиента"
                            value={props.newClient.lastname}
                            ref={lastnameRef}
                            onChange={() => {
                                props.updateClient(collectFormData())
                            }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password"
                            placeholder="Введите пароль"
                            value={props.newClient.password}
                            ref={passwordRef}
                            onChange={() => {
                                props.updateClient(collectFormData())
                            }} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={(e) => {
                        props.createClient(props.newClient)
                    }}>
                        Создать
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default NewClientCreationForm;