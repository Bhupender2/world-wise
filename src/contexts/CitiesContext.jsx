import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, cities: action.payload };
    case "currentCity/loaded":
      return { ...state, currentCity: action.payload };
    case "city/created":
      return { ...state, cities: [...state.cities, action.payload] };

    case "city/deleted":
      return { ...state , cities:state.cities.filter((city) => city.id !== action.payload)};
    default:
      throw new Error("there is an error in loadind data");
  }
}
//reducer are pure function which means we can't do these API requests so we do the api requests in useEffects and after getting data we dispatch the action when async data and async code is involved then we don't get the benefit of simply passing the dispatch function in the context value

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    //we want to see the data on mount and fetching data is a side effect so we use useEffect
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`); // await -- basically wait the promise to reesolve and then proceed the execution
        const data = await res.json();
        console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        alert("There was an Error loading data ");
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "currentCity/loaded", payload: data });
    } catch {
      alert("there is a error in getting the currentCity");
    }
  }

  // TODO creating a new city
  async function createCity(newCity) {
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      }); //using POST method we are submitting the data to our fake server
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
      // setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating a new city...");
    }
  }
  // TODO deleting a city
  async function deleteCity(id) {
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      }); //using DELETE method to delete  the data to our fake server
      dispatch({ type: "city/deleted", payload: id });

      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting the city data...");
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
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
