import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    //we want to see the data on mount and fetching data is a side effect so we use useEffect
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`); // await -- basically wait the promise to reesolve and then proceed the execution
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch {
        alert("There was an Error loading data ");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("gandu error aaraha h");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      }); //using POST method we are submitting the data to our fake server
      const data = await res.json();
      setCities((cities)=>[...cities, data])
    } catch {
      alert("There was an error loading data...");
    } finally { 
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, getCity, currentCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
