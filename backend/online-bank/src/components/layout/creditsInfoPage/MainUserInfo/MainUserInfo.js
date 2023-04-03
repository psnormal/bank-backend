import React from "react"
import { Container } from "react-bootstrap"

function MainUserInfo(props) {
    return (
        <>
            <Container className="mb-4">
                <h5>Информация о клиенте:</h5>
                <p>{props.name} {props.lastname}</p>
                <p>Кредитный рейтинг: {props.creditRating}</p>
            </Container>
        </>
    )
}

export default MainUserInfo;