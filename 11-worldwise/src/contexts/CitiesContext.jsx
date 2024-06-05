import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(function () {
		async function fetchCities() {
			try {
				setisLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch {
				alert('There is Error in loading the data');
			} finally {
				setisLoading(false);
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setisLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch {
			alert('There is Error in loading the data');
		} finally {
			setisLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				setCurrentCity,
				getCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}
function useCitites() {
	const context = useContext(CitiesContext);
	if (context === undefined) {
		throw new Error('Cities context was used outside the citites provider');
	}
	return context;
}
export { CitiesProvider, useCitites };
