import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import {TodoListsList} from "../pages/TodolistsList/TodoListsList";

function App() {
    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>

    );
}
export default App;
