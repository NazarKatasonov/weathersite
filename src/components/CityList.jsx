import CityCard from './CityCard';

export default function CityList({ cities, weather, onRefresh, onDelete, onFav }) {
  return (
    <section className="cities">
      {cities.map(city => (
        <CityCard
          key={city.name}
          city={city}
          data={weather[city.name]}
          onRefresh={onRefresh}
          onDelete={onDelete}
          onFav={onFav}
        />
      ))}
    </section>
  );
}