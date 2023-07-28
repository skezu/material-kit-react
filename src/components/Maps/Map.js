import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "leaflet.heat";
import { Box } from '@mui/system';
import { Button, Typography} from '@mui/material';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import { orders } from 'src/components/orders';
import { useState } from 'react';
import { SeverityPill } from '../severity-pill';

const statusMap = {
  cours: 'warning',
  traité: 'success',
  attente: 'error'
};

function Map() {
  const position = [48.891811, 2.230672];

  return (
    <MapContainer style={{ width: '100%', height: '30rem' }} center={position} zoom={15} scrollWheelZoom={false} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {orders.map((order) => (
        <Marker
          key={order.id}
          position={[order.latitude, order.longitude]}
          icon={L.icon({
            iconUrl: order.image,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
          })}
        >
          <Popup>
            <Typography variant="h6">Déchet Signalé</Typography>
            <Typography variant="body1">Référence: {order.ref}</Typography>
            <Typography variant="body1">Client: {order.customer.name}</Typography>
            <Typography variant="body1">Status: <SeverityPill color={statusMap[order.status]} >
              {order.status}
            </SeverityPill></Typography>
            
            <Button sx={{ mt: 2, ml: 3, justifySelf: 'center' }} variant="outlined" color="primary">Traiter</Button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
