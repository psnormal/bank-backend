import React from "react";
import ClientsContainer from "./ClientsContainer";
import NewClientCreationFormContainer from "./NewClientCreationFormContainer";

function ClientPage() {
    return (
        <>
            <NewClientCreationFormContainer />
            <ClientsContainer/>
        </>
    )
}

export default ClientPage