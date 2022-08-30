import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme } from "@mui/material"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Shop from './Shop'
import Cart from './Cart';

const theme = createTheme({
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<ThemeProvider
		theme={theme}
		>
			<BrowserRouter>
				<React.StrictMode>
					<Routes>
						<Route path="/" element={<App />}>
              <Route index element={<>Welcome to Kilkimi Whiskies. Buy some damn whisky.</>}/>
							<Route path="/shop" element={<Shop/>}/>
							<Route path="/cart" element={<Cart/>}/>
						</Route>
					</Routes>
				</React.StrictMode>
			</BrowserRouter>

		</ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
