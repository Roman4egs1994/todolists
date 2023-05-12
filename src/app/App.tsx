import React, {useEffect} from 'react';
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
import {Login} from "../pages/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./castomDispatch/castomUseAppDispatch";
import {initializeAppTC, logoutTC} from "../pages/Login/authReducer";
import {CircularProgress} from "@mui/material";

function App() {
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType,RequestStatusType>((state)=> state.appReducer.status)
    const isLoggedIn = useAppSelector<boolean>(state => state.authReducer.isLoggedIn)
    const isInitialized = useAppSelector<boolean>(state => state.authReducer.isInitialized)

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

    const onClickBtnLogout = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
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
                        {isLoggedIn ? <Button color="inherit" href={'https://roman4egs1994.github.io/todolists/'} onClick={onClickBtnLogout} >Logout</Button>
                                    : <Button color="inherit" href={'https://roman4egs1994.github.io/todolists/login'} >Login</Button>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
            {status === 'loading' && <LinearProgress className={'linearProgress'} color="inherit"/>}
            <Container fixed>
                <Routes>
                    <Route path={'https://roman4egs1994.github.io/todolists/'} element={<TodoListsList/>}/>
                    <Route path={'https://roman4egs1994.github.io/todolists/login'} element={ <Login/>}/>

                    {/*<Route path={'https://roman4egs1994.github.io/todolists/404'} element={<div style={{textAlign: 'center'}}>404 not found</div>}/>*/}
                    {/*<Route path={'*'} element={<Navigate to={'/404'}/>}/>*/}
                </Routes>
            </Container>
            
        </div>

    );
}
export default App;
