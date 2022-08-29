import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import { Avatar, Box, Container, Toolbar, Typography } from '@mui/material';

function App() {

    const NavLink = (props) => {
        return (
            <>
                <Typography variant='h6' color='white'>
                    <Link className='App-navlink' style={{ textDecoration: 'none' }} to={'/' + props.link}>
                        {props.name}
                    </Link>
                </Typography>
            </>
        )
    }

    return (
    <Box id="root">
        <AppBar position='sticky' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h3'>Kilkimi Whiskies</Typography>
                <Toolbar>
                    <NavLink name='Shop' link='shop'></NavLink>
                    <NavLink name='My Cart' link='cart'></NavLink>
                </Toolbar>
            </Box>
        </AppBar>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <Outlet/>
        </Box>
    </Box>
  );
}

export default App;
