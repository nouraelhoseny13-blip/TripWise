import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import { TripProvider } from "./context/TripContext";
import { ToastProvider } from "./context/ToastContext";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import TripPlanner from "./pages/TripPlanner";
import BudgetCalculator from "./pages/BudgetCalculator";
import Weather from "./pages/Weather";
import InteractiveMap from "./pages/InteractiveMap";
import SavedTrips from "./pages/SavedTrips";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

        <Route
          path="/explore"
          element={
            <PageTransition>
              <Explore />
            </PageTransition>
          }
        />

        <Route
          path="/destination/:id"
          element={
            <PageTransition>
              <DestinationDetails />
            </PageTransition>
          }
        />

        <Route
          path="/planner"
          element={
            <PageTransition>
              <TripPlanner />
            </PageTransition>
          }
        />

        <Route
          path="/budget"
          element={
            <PageTransition>
              <BudgetCalculator />
            </PageTransition>
          }
        />

        <Route
          path="/weather"
          element={
            <PageTransition>
              <Weather />
            </PageTransition>
          }
        />

        <Route
          path="/map"
          element={
            <PageTransition>
              <InteractiveMap />
            </PageTransition>
          }
        />

        <Route
          path="/saved"
          element={
            <PageTransition>
              <SavedTrips />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <TripProvider>
      <ToastProvider>
        <Navbar />
        <AppRoutes />
      </ToastProvider>
    </TripProvider>
  );
}

export default App;