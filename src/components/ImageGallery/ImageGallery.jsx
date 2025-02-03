import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  if (!images || images.length === 0) return <p>Start searching</p>;

  return (
    <section className={s.section}>
      <ul className={s.ul}>
        {images.map((image) => (
          <li key={image.id} className={s.li}>
            <ImageCard image={image} onClick={onImageClick} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ImageGallery;
