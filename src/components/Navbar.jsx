import { NavLink } from "react-router-dom";
import {
  Heart,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { useTrip } from "../context/TripContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useTrip();

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-300 ${
      isActive ? "text-primary" : "text-text"
    } hover:text-primary-dark`;

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-pink text-primary-dark shadow-sm transition duration-300 group-hover:scale-105 group-hover:shadow-md">
            <Heart
              size={20}
              fill="currentColor"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <span className="font-heading text-2xl font-bold text-text transition-colors duration-300 group-hover:text-primary-dark">
            TripWise
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/explore" className={navLinkClass}>
            Explore
          </NavLink>

          <NavLink to="/planner" className={navLinkClass}>
            Trip Planner
          </NavLink>

          <NavLink to="/budget" className={navLinkClass}>
            Budget
          </NavLink>

          <NavLink to="/weather" className={navLinkClass}>
            Weather
          </NavLink>

          <NavLink to="/map" className={navLinkClass}>
            Map
          </NavLink>

          <NavLink to="/saved" className={navLinkClass}>
            Saved Trips
          </NavLink>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? "Enable dark mode"
                : "Enable light mode"
            }
            className="group flex h-10 w-10 items-center justify-center rounded-[10px] border border-primary/10 bg-white text-text shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-soft-pink hover:text-primary-dark hover:shadow-md dark:bg-white"
          >
            {theme === "light" ? (
              <Moon
                size={19}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            ) : (
              <Sun
                size={19}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            )}
          </button>

          {/* Start Planning */}
          <NavLink
            to="/planner"
            className="rounded-[10px] bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md"
          >
            Start Planning
          </NavLink>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">

          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? "Enable dark mode"
                : "Enable light mode"
            }
            className="group flex h-10 w-10 items-center justify-center rounded-[10px] text-text transition duration-300 hover:bg-soft-pink hover:text-primary-dark"
          >
            {theme === "light" ? (
              <Moon
                size={19}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            ) : (
              <Sun
                size={19}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            )}
          </button>

          {/* Mobile Menu */}
          <button
            type="button"
            className="rounded-[10px] p-2 text-text transition duration-300 hover:bg-soft-pink hover:text-primary-dark"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-primary/10 bg-background px-6 py-5 shadow-sm md:hidden">
          <div className="flex flex-col gap-4">

            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/explore"
              onClick={() => setIsOpen(false)}
              className={navLinkClass}
            >
              Explore
            </NavLink>

            <NavLink
              to="/planner"
              onClick={() => setIsOpen(false)}
              className={navLinkClass}
            >
              Trip Planner
            </NavLink>

            <NavLink
              to="/budget"
              onClick={() => setIsOpen(false)}
              className={navLinkClass}
            >
              Budget
            </NavLink>

            <NavLink
              to="/weather"
              onClick={() => setIsOpen(false)}
              className={navLinkClass}
            >
              Weather
            </NavLink>

            <NavLink
              to="/map"
              onClick={() => setIsOpen(false)}
              className={navLinkClass}
            >
              Map
            </NavLink>

            <NavLink
              to="/saved"
              onClick={() => setIsOpen(false)}
              className={navLinkClass}
            >
              Saved Trips
            </NavLink>

            <NavLink
              to="/planner"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-[10px] bg-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-primary-dark hover:shadow-md"
            >
              Start Planning
            </NavLink>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
