import { useEffect, useState } from "react";
import {
  MapContainer,
  Popup,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import styles from "./Map.module.css";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [maplat, maplng] = useUrlPosition(); // whenever we need the position from the URL we need to call this costum HOOK 

  useEffect(
    function () {
      if (maplat && maplng) setMapPosition([maplat, maplng]); //it will run every time the maplat,laplng values changes and we fetching data from url so its a side effect too so we use useffect to synchronise the map and the cty comp . we want to remember the maplat, maplng even after they are not defined(not exist)
    },
    [maplat, maplng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        // by default geoLocationPositon is null as we have given the default value to none
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      console.log(geolocationPosition);
    },
    [geolocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {/*we have already declared getPosition in the geoLocation Costum Hook */}
          {isLoadingPosition ? "Loading..." : "Use Your Location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[maplat, maplng]} // but it isn't reactive on changing the lat, lng . center will not be reactive so we have to do this ourself
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span> <br />
              <span className={styles.emoji}>{city.emoji}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap(); // to get the current instance of the map that is currently being displayed
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate(); //we use useNavigate to programatically navigate bewteen routes without clicking on any Links .its an imperavtive way of navigation bewteen routes  TODO onClick={() => navigate("form")} TODO
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
