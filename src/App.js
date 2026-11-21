import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CityList from "./components/CityList";
import WeatherDetails from "./components/WeatherDetails";
import News from "./components/News";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import SignUpModal from "./components/SignUpModal";
import { getCurrentWeather } from "./api/weather";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [cities, setCities] = useLocalStorage("cities", []);
  const [weather, setWeather] = useState({});
  const [selected, setSelected] = useState(null);

  const loadWeather = async (name) => {
    try {
      const data = await getCurrentWeather(name);
      setWeather((prev) => ({ ...prev, [name]: data }));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cities.forEach((c) => loadWeather(c.name));
  }, []);

  const handleSearch = async (city) => {
    try {
      setError("");
      const data = await getCurrentWeather(city);

      if (cities.some((c) => c.name === data.name)) {
        setError("City is already in the list");
        return;
      }

      setCities([...cities, { name: data.name, fav: false }]);
      setWeather({ ...weather, [data.name]: data });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (name) => {
    setCities(cities.filter((c) => c.name !== name));
    if (selected === name) {
      setSelected(null);
    }
  };

  const handleFav = (name) => {
    setCities(cities.map((c) => (c.name === name ? { ...c, fav: !c.fav } : c)));
  };

  const handleSignUp = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    setIsModalOpen(false);
  };

  return (
    <>
      <Header user={user} onSignUp={() => setIsModalOpen(true)} />
      <Hero onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      <CityList
        cities={cities}
        weather={weather}
        onRefresh={loadWeather}
        onDelete={handleDelete}
        onFav={handleFav}
        onMore={setSelected}
      />
      {selected && weather[selected] && (
        <WeatherDetails data={weather[selected]} />
      )}
      <News />
      <Gallery />
      <Footer />
      {isModalOpen && (
        <SignUpModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSignUp}
        />
      )}
    </>
  );
}
