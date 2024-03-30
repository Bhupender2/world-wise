import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList({ isLoading, cities }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    //if cities data is not fetched then this will do the work
    return <Message message="Add your city by clicking on a city on the map" />;
  const countries = cities?.map((curr) => curr.country);

  const filterCountries = [...new Set(countries)];
  console.log(filterCountries);

  return (
    <ul className={styles.countryList}>
      {filterCountries?.map((city) => city)}
    </ul>
  );
}

export default CountryList;
