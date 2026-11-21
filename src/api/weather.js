const KEY = "93e4576e1f2cc9a6abe4284f78dfb700";

export async function getCurrentWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`,
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}
