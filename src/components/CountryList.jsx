import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList({ isLoading, cities }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    //if cities data is not fetched then this will do the work
    return <Message message="Add your city by clicking on a city on the map" />;
  const countries = cities.reduce((arr, curr) => {
    if (!arr.map((el) => el.country).includes(curr.country))
      return [
        ...arr,
        { country: curr.country, emoji: curr.emoji, id: curr.id },
      ];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
