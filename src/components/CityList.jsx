import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList({ isLoading, cities }) {
  if (isLoading) return <Spinner />;

  if (!cities.length) //if cities data is not fetched then this will do the work
    return <Message message="Add your city by clicking on a city on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
