import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [selectedDestination, setSelectedDestination] =
    useState(null);

  const [budget, setBudget] = useState({
    hotel: 0,
    food: 0,
    activities: 0,
    transport: 0,
    total: 0,
    perPerson: 0,
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("tripwise_theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("tripwise_theme", theme);

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <TripContext.Provider
      value={{
        selectedDestination,
        setSelectedDestination,
        budget,
        setBudget,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error(
      "useTrip must be used inside TripProvider"
    );
  }

  return context;
}