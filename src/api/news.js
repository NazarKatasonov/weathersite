const KEY = "56c4d2861d5e418d838fd3ee16d0352f";

export async function getNews() {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=pets&language=en&pageSize=30&apiKey=${KEY}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.articles;
}
ß