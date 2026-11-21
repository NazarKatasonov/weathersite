import { useState } from "react";
import heroImg from "../assets/hero.svg";

function getOrdinal(day) {
  if (day === 1 || day === 21 || day === 31) return "st";
  if (day === 2 || day === 22) return "nd";
  if (day === 3 || day === 23) return "rd";
  return "th";
}

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState("");

  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "long" });
  const weekday = today.toLocaleString("en-US", { weekday: "long" });
  const year = today.getFullYear();
  const day = today.getDate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query.trim());
    setQuery("");
  };

  return (
    <section className="hero">
      <h1 className="hero_title">Weather dashboard</h1>

      <div className="hero_row">
        <p className="hero_text">
          Create your personal list of favorite cities and always be aware of
          the weather.
        </p>
        <p className="hero_date">
          {month} {year}
          <br />
          {weekday}, {day}
          <sup>{getOrdinal(day)}</sup>
        </p>
      </div>

      <form className="hero_search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔎</button>
      </form>
    </section>
  );
}
