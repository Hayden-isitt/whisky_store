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

function Cart() {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) ?? {})
    const [allPrices, ] = useState(Object.fromEntries(new Map(StockData.map((x) => [x.sku, x.price]))))
    const [totalPrice, setTotalPrice] = useState(0)

    const updateCart = (productCode, quantity) => {
        var currCart = cartData
        currCart[productCode] = parseInt(quantity)
        
        setCartData(currCart)
        localStorage.setItem('cart', JSON.stringify(currCart))
        setTotalPrice(Object.entries(cartData).reduce((sum, a) => sum + allPrices[a[0]] * a[1], 0))
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Product Name</TableCell>
                        <TableCell align="left">Quantity</TableCell>
                        <TableCell align="left">Price</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(cartData).map((row, key) => <Item key={key} item={row[0]} qty={row[1]} updateCart={updateCart}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                {`Total: $${totalPrice.toFixed(2)}`}
                <Button variant='contained'>Checkout</Button>
            </Box>
        </Box>
    )
}

function Item(props) {
    const [itemData, ] = useState(StockData.filter(x => x.sku == props.item)[0])
    const [qty, setQty] = useState(props.qty)

    useEffect(() => {
        props.updateCart(props.item, qty)
    }, [qty])

    return(
        <>
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="left">{itemData.name}</TableCell>
                <TableCell align="left">
                    <TextField 
                        type='number'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        size='small'
                    />
                </TableCell>
                <TableCell align="left">{`$${(itemData.price * qty).toFixed(2)}`}</TableCell>
            </TableRow>
        </>
    )
}

export default Cart;
