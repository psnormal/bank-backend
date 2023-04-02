import React from "react"
import { Container, ListGroup } from "react-bootstrap"
import CreditOverduePaymentsItem from "./CreditOverduePaymentsItem";

function CreditOverduePaymentsList(props) {
    return (
        <>
            {
                props.overduePayments.length === 0
                    ? <>
                        <h6>У клиента нет просроченных платежей по данному кредиту</h6>
                    </>
                    : <>
                        <h6>Просроченные платежи:</h6>
                        <ListGroup>
                            {
                                props.overduePayments.map((overduePayment) => {
                                    return <CreditOverduePaymentsItem payment={overduePayment} key={overduePayment.creditPaymentId} />
                                })
                            }
                        </ListGroup>
                    </>

            }

        </>
    )
}

export default CreditOverduePaymentsList;