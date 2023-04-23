import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import {TodoListsList} from "../pages/TodolistsList/TodoListsList";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/errorSnackBar/ErrorSnackBar";

function App() {

    const status = useSelector<AppRootStateType,RequestStatusType>((state)=> state.appReducer.status)

    return (
        <div>
            <ErrorSnackbar/>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            {status === 'loading' && <LinearProgress color="inherit"/>}
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>

    );
}
export default App;
