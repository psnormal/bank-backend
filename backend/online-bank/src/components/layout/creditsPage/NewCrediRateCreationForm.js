import React from "react";
import {Form, Button, Card} from 'react-bootstrap';

function NewCreditRateCreationForm() {
    return (
        <Card className="mb-4 mx-auto" style={{ width: '800px' }}>
            <Card.Body>
                <h3 className="text-center">Создать новый кредитный тариф</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text" placeholder="Введите название нового тарифа" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="rate">
                        <Form.Label>Процентная ставка</Form.Label>
                        <Form.Control type="еуче" placeholder="Введите процентную ставку нового тарифа" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Создать
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default NewCreditRateCreationForm;