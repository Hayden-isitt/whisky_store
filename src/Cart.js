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

const calculateItemPrice = (productCode, qty, price) => {
    
    var totalPrice = 0

    if(productCode == 'JOHN'){
        totalPrice = price * (qty - Math.floor(qty / 4))
    }else if(productCode == 'ARR' && qty >= 12){
        totalPrice = 75 * qty
    }else{
        totalPrice = price * qty
    }
    return totalPrice
}

function Cart() {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) ?? {})
    const [allPrices, ] = useState(Object.fromEntries(new Map(StockData.map((x) => [x.sku, x.price]))))
    const [totalPrice, setTotalPrice] = useState(0)
    
    const calculateTotalPrice = (cart) => {
        var totalPrice = 0
        var currProduct = null
        var currQty = 0
        var currPrice = 0
        
        for(var i=0; i < Object.keys(cart).length; i+=1){
            currProduct = Object.keys(cart)[i]
            currQty = cart[currProduct]
            currPrice = allPrices[currProduct]

            totalPrice += calculateItemPrice(currProduct, currQty, currPrice)
        }
        return totalPrice
    }

    const removeFromCart = (productCode) => {
        var currCart = cartData
        delete currCart[productCode]

        setCartData(currCart)
        localStorage.setItem('cart', JSON.stringify(currCart))
    }

    useEffect(() => {
        setTotalPrice(calculateTotalPrice(cartData))
    }, [cartData])

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Product Name</TableCell>
                        <TableCell align="left">Quantity</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(cartData).map((row, key) => <Item key={key} item={row[0]} qty={row[1]} remove={removeFromCart}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                {`Total: $${totalPrice.toFixed(2)}`}
                <Button variant='contained'>Checkout</Button>
                {totalPrice > 500 && "A free bottle of 'Deanston 12 years old' will be added to your order at checkout"}
            </Box>
        </Box>
    )
}

function Item(props) {
    const [itemData, ] = useState(StockData.filter(x => x.sku == props.item)[0])
    const [qty, setQty] = useState(props.qty)

    return(
        <>
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="left">{itemData.name}</TableCell>
                <TableCell align="left">{qty}</TableCell>
                <TableCell align="left">{`$${(calculateItemPrice(itemData.sku, qty, itemData.price)).toFixed(2)}`}</TableCell>
                <TableCell align="left"><Button variant='outlined' onClick={(e) => {
                    props.remove(itemData.sku)
                    setQty(0)
                }}>Remove</Button></TableCell>
            </TableRow>
        </>
    )
}

export default Cart;
