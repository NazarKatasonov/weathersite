import { useState, useEffect } from "react";
import { getNature } from "../api/gallery";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getNature().then((list) => setImages(list));
  }, []);

  const visible = [];

  if (images.length >= 5) {
    for (let i = -2; i <= 2; i++) {
      const index = (current + i + images.length) % images.length;
      visible.push({ image: images[index], index: index, position: i });
    }
  }

  return (
    <section className="gallery">
      <h2 className="gallery_title">Beautiful nature</h2>

      <div className="gallery_list">
        {visible.map((item) => (
          <img
            key={item.image.id}
            className={
              item.position === 0
                ? "gallery_item gallery_item_active"
                : "gallery_item"
            }
            src={item.image.webformatURL}
            alt={item.image.tags}
            onClick={() => setCurrent(item.index)}
          />
        ))}
      </div>
    </section>
  );
}
