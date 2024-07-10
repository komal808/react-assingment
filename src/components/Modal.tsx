import React, { useEffect } from "react";
import { ImageCardData } from "../types";

interface ModalProps {
  card: ImageCardData;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ card, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img className="modal-image" src={`/assets/${card.type}.jpg`} alt={card.title} />
      </div>
    </div>
  );
};

export default Modal;
