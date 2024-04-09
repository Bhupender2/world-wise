import { useState } from "react";
import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, SetSearchParams] = useSearchParams();
  const navigate = useNavigate(); // we use useNavigate to programatically navigate bewteen routes without clicking on any Links .its an imperavtive way of navigation bewteen routes  TODO onClick={() => navigate("form")} TODO
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer}>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
