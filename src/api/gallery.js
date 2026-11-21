const KEY = "58214434-1557d4eac3fcf01f43d31f782";

export async function getPets() {
  const response = await fetch(
    `https://pixabay.com/api/?key=${KEY}&q=pets&category=animals&image_type=photo&per_page=20`,
  );

  const data = await response.json();
  return data.hits;
}

export async function getNature() {
  const response = await fetch(
    `https://pixabay.com/api/?key=${KEY}&q=nature&image_type=photo&orientation=horizontal&per_page=7`,
  );

  const data = await response.json();
  return data.hits;
}
