import React from "react"
import { Container, ListGroup } from "react-bootstrap"
import CreditItem from "./CreditItem/CreditItem"

function CreditsList(props) {
    return (
        <>
            <Container className="mb-2">
                {
                    props.credits.length === 0
                        ? <>
                            <h5>У клиента нет кредитов</h5>
                        </>
                        : <>
                            <h5>Кредиты клиента:</h5>
                            <ListGroup>
                                {
                                    props.credits.map((credit) => {
                                        return <CreditItem credit={credit} key={credit.creditID} />
                                    })
                                }
                            </ListGroup>
                        </>

                }
            </Container>

        </>
    )
}

export default CreditsList;