import s from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className={s.card} onClick={() => onClick(image)}> {/* <-- Передаємо об'єкт image */}
      <img src={image.urls.small} alt={image.alt_description} className={s.image} />
    </div>
  );
};

export default ImageCard;
