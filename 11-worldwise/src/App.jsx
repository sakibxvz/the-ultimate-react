import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Home from './pages/HomePage';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';

const BASE_URL = 'http://localhost:9000';
function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setisLoading] = useState(false);

	useEffect(function () {
		async function fetchCities() {
			try {
				setisLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
				console.log(data)
			} catch {
				alert('There is Error in loading the data');
			} finally {
				setisLoading(false);
			}
		}
		fetchCities();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path='product' element={<Product />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='login' element={<Login />} />
				<Route path='app' element={<AppLayout />}>
					<Route
						index
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route
						path='cities'
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route
						path='countries'
						element={<CountryList cities={cities} isLoading={isLoading} />}
					/>
					<Route path='form' element={<p>Form</p>} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
