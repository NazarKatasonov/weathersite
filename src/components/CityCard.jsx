import { useState, useEffect } from "react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function addZero(number) {
  if (number < 10) {
    return "0" + number;
  }
  return String(number);
}

export default function CityCard({ city, data, onRefresh, onDelete, onFav }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(timer);
  }, []);

  if (!data) {
    return (
      <article className="card">
        <p>{city.name}: loading...</p>
      </article>
    );
  }

  const cityTime = new Date(now + data.timezone * 1000);

  const hours = addZero(cityTime.getUTCHours());
  const minutes = addZero(cityTime.getUTCMinutes());
  const day = addZero(cityTime.getUTCDate());
  const month = addZero(cityTime.getUTCMonth() + 1);
  const year = cityTime.getUTCFullYear();
  const weekday = days[cityTime.getUTCDay()];

  const country = new Intl.DisplayNames(["en"], { type: "region" }).of(
    data.sys.country,
  );

  return (
    <article className="card">
      <div className="card_top">
        <span>{data.name}</span>
        <span>{country}</span>
      </div>

      <p className="card_time">
        {hours}:{minutes}
      </p>

      <div className="card_tabs">
        <button className="btn">Hourly forecast</button>
        <button className="btn">Weekly forecast</button>
      </div>

      <div className="card_date">
        <span>
          {day}.{month}.{year}
        </span>
        <span className="card_line"></span>
        <span>{weekday}</span>
      </div>

      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
        alt={data.weather[0].description}
        width="110"
        height="110"
      />

      <p className="card_temp">{Math.round(data.main.temp)}°C</p>

      <div className="card_actions">
        <button className="card_icon" onClick={() => onRefresh(city.name)}>
          ↻
        </button>

        <button
          className="card_icon"
          style={{ color: "#ff4d4d" }}
          onClick={() => onFav(city.name)}
        >
          {city.fav ? "♥" : "♡"}
        </button>

        <button className="btn">See more</button>

        <button className="card_icon" onClick={() => onDelete(city.name)}>
          🗑
        </button>
      </div>
    </article>
  );
}
