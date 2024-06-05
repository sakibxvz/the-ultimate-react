import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCitites } from '../contexts/CitiesContext';

import styles from './Map.module.css';
import { useState } from 'react';

function Map() {
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const { cities } = useCitites();

	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	return (
		<div id='map' className={styles.mapContainer}>
			<MapContainer
				center={mapPosition}
				zoom={13}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.map((city) => (
					<Marker key={city.id} position={[city.position.lat, city.position.lng]}>
						<Popup>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}

export default Map;
