
import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={s.modal} 
      overlayClassName={s.overlay}
    >
      <button className={s.closeButton} onClick={onClose}>×</button>
      <img src={image.urls.regular} alt={image.alt_description} className={s.image} />
      <p className={s.description}>{image.alt_description || "No description available"}</p>
    </Modal>
  );
};

export default ImageModal;
