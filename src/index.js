import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme } from "@mui/material"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Shop from './Shop'

const theme = createTheme({
  spacing: 4,
  palette: {
      primary: {
        main: '#22396f',
        light: '#53639e',
        dark: '#001443',
        contrastText: '#fff',
      },
      secondary: {
        main: '#e0b869',
        light: '#ffea98',
        dark: '#ac883c',
        contrastText: '#22396f',
      },
  },
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
							<Route path="/shop" element={<Shop/>}/>
							<Route path="/cart" element={<></>}/>
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
