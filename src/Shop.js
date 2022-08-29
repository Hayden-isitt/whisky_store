import './App.css';
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, Input, TextField, Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const data = [
    {id: 1, sku: 'DEAN', name: 'Deanston 12 years old', price: 99.99},
    {id: 2, sku: 'KIL', name: 'Kilkerran 12 years old', price: 89.99},
    {id: 3, sku: 'ARR', name: 'Arran 10 years old', price: 79.99},
    {id: 4, sku: 'JOHN', name: 'Johnnie Walker Green Label', price: 75.99}
]

const cols = [
    {
        field: 'sku', 
        headerName: 'SKU'
    },
    {
        field: 'name', 
        headerName: 'Product Name', 
        width: 250
    },
    {
        field: 'price', 
        headerName: 'Price',
        valueGetter: (params) => `$${params.row.price}`
    },
    {
        field: 'id', 
        headerName: '',
        width: 200,
        renderCell: (params) => <>
            <TextField 
                type='number'
                defaultValue={1}
                size='small'
            />
            <Button variant='outlined'>Add</Button>
        </>
    },
]

function Shop() {

    return (
    <Box>
        Buy some Whisky
        <Box style={{ height: 400, width: 800 }}>
            <DataGrid
                rows={data}
                columns={cols}
                hideFooter={true}
            />
        </Box>
    </Box>
  );
}

export default Shop;
