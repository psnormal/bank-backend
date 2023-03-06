import React from "react";
import {Form, Button, Card} from 'react-bootstrap';

function NewCreditRateCreationForm(props) {
    const titleRef = React.createRef();
    const descriptionRef = React.createRef();
    const interestRateRef = React.createRef();

    return (
        <Card className="mb-4 mx-auto" style={{ width: '800px' }}>
            <Card.Body>
                <h3 className="text-center">Создать новый кредитный тариф</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text"
                            placeholder="Введите название нового тарифа"
                            defaultValue={props.newCreditRate.title}
                            ref={titleRef}
                            onChange={() => {
                                props.setCreditRate({
                                    title: titleRef.current.value,
                                    description: descriptionRef.current.value,
                                    interestRate: interestRateRef.current.value
                                })
                            }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            placeholder="Введите описание нового тарифа"
                            defaultValue={props.newCreditRate.description}
                            ref={descriptionRef}
                            onChange={() => {
                                props.setCreditRate({
                                    title: titleRef.current.value,
                                    description: descriptionRef.current.value,
                                    interestRate: interestRateRef.current.value
                                })
                            }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="rate">
                        <Form.Label>Процентная ставка</Form.Label>
                        <Form.Control type="text"
                            placeholder="Введите процентную ставку нового тарифа"
                            defaultValue={props.newCreditRate.interestRate}
                            ref={interestRateRef}
                            onChange={() => {
                                props.setCreditRate({
                                    title: titleRef.current.value,
                                    description: descriptionRef.current.value,
                                    interestRate: interestRateRef.current.value
                                })
                            }} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={(e) => {
                        props.createCreditRate(titleRef.current.value,
                            descriptionRef.current.value,
                            interestRateRef.current.value)
                    }}>
                        Создать
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default NewCreditRateCreationForm;