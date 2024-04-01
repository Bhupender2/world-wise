import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, SetSearchParams] = useSearchParams();
  const navigate = useNavigate(); // we use useNavigate to programatically navigate bewteen routes without clicking on any Links .its an imperavtive way of navigation bewteen routes

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={()=>navigate("form")}>
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
