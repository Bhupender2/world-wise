import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded": //this is the naming convention we should follow instead of writing like "setCities" more like events not like setters
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown Action Type ):");
  }
}
//reducer are pure function which means we can't do these API requests so we do the api requests in useEffects and after getting data we dispatch the action when async data and async code is involved then we don't get the benefit of simply passing the dispatch function in the context value

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    //we want to see the data on mount and fetching data is a side effect so we use useEffect
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`); // await -- basically wait the promise to reesolve and then proceed the execution
        const data = await res.json();
        console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an Error loading data ",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    // id is coming from URL so its automatically a string so we need to convert it
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an Error getting the current city data ",
      });
    }
  }

  // TODO creating a new city
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        //adding the new city to the server  here
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      }); //using POST method we are submitting the data to our fake server
      const data = await res.json();
      dispatch({ type: "city/created", payload: data }); // here ssync the remote atate to the ui state (setting to the local state(ui state))
      // setCities((cities) => [...cities, data]);
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an Error creating the new city ",
      });
    }
  }
  // TODO deleting a city
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      }); //using DELETE method to delete  the data to our fake server
      dispatch({ type: "city/deleted", payload: id });

      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an Error deleting the city data ",
      });
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
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext are used outside of CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };

// dispatch function in context API
// 1. we can pass the dispatch function in the context value prop but than we need to write all the async logic to the component which is not a good approach because it made the code less readable so its better to write your dispatch function inside an event handler function and then pass the event handler to the context value (its the best approach while dealing with async code )

// 2. while dealing with non-async code its better to pass the dispatch to the context value and then write the logic code to component itself and we cant write the async logic code to the reducer function because reducer is a PURE FUNCTION.
