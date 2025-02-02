import { useState } from "react";
import s from "./ImageCard.module.css";
import ImageModal from "../ImageModal/ImageModal";

const ImageCard = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={s.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={s.image}
        onClick={() => setIsModalOpen(true)}
      />
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={image}
      />
    </div>
  );
};

export default ImageCard;
