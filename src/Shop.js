import './App.css';
import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Box, Button, Container, Input, Snackbar, TextField, Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StockData from './StockData';

function Shop() {
    const [openAlert, setOpenAlert] = useState(false)

    const handleCloseAlert = (e) => {
        setOpenAlert(false);
    }
    
    const addToCart = (productCode, quantity) => {
        var currCart = JSON.parse(localStorage.getItem('cart')) ?? {}
        var currProductQty = currCart[productCode] ?? 0
        
        if(productCode != 'KIL' || parseInt(currProductQty) + parseInt(quantity) <= 1){
            currCart[productCode] = parseInt(currProductQty) + parseInt(quantity)
            localStorage.setItem('cart', JSON.stringify(currCart))
            setOpenAlert(true)
        }
    }

    return (
    <Box>
        <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="success" variant="filled" sx={{ width: '100%' }}>
            Added to cart
            </Alert>
        </Snackbar>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left">SKU</TableCell>
                    <TableCell align="left">Product Name</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Add to Cart</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {StockData.map((row) => <Item key={row.id} row={row} addToCart={addToCart}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  );
}

function Item(props) {
    const [qty, setQty] = useState(1)

    const updateQty = (e) => {
        var newQty = Math.max(e.target.value, 0)
        if(props.row.sku == 'KIL'){
            setQty(Math.min(newQty, 1))
        } else {
            setQty(newQty)
        }
    }

    return(
        <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">{props.row.sku}</TableCell>
            <TableCell align="left">{props.row.name}</TableCell>
            <TableCell align="left">{`$${props.row.price}`}</TableCell>
            <TableCell align="left">
                <TextField 
                    type='number'
                    value={qty}
                    onChange={updateQty}
                    size='small'
                />
                <Button 
                    variant='outlined'
                    onClick={(e) => props.addToCart(props.row.sku, qty)}
                    disabled={qty <= 0}
                >Add
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default Shop;
