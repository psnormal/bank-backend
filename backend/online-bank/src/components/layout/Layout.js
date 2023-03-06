import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "./navigation/NavBar";

function Layout() {
    return (
        <>
        <NavBar />

        <Container>
            <Outlet/>
        </Container>
        </>
    );
}

export default Layout;