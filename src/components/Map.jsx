import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, SetSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position :{lat},{lng}
      </h1>
      <button onClick={() => SetSearchParams({ lat: 23, lng: 58 })}>
        {/* we can even update the query string */}
        Change Position
      </button>
    </div>
  );
}

export default Map;
