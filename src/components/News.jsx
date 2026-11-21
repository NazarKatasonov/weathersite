import { useState, useEffect } from "react";
import { getPets } from "../api/gallery";

export default function News() {
  const [pets, setPets] = useState([]);
  const [count, setCount] = useState(4);

  useEffect(() => {
    getPets().then((list) => setPets(list));
  }, []);

  return (
    <section className="news" id="news">
      <h2 className="news_title">Interacting with our pets</h2>

      <div className="news_list">
        {pets.slice(0, count).map((pet) => (
          <div className="news_item" key={pet.id}>
            <img className="news_img" src={pet.webformatURL} alt={pet.tags} />
            <p className="news_text">{pet.tags}</p>
          </div>
        ))}
      </div>

      {count < pets.length && (
        <button className="btn news_more" onClick={() => setCount(count + 4)}>
          See more
        </button>
      )}
    </section>
  );
}
