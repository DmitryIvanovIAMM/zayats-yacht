import React from 'react';
import { motion } from 'framer-motion';
import './photo-gallery.css';

export interface ImageModalProps {
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
  selectedImg: string | null;
}

const ImageModal = ({ setSelectedImg, selectedImg }: ImageModalProps) => {
  const handleClick = (e) => {
    if (e.target?.classList?.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg as string}
        alt="enlarged-image-from-gallery-page"
        animate={{ x: 0 }}
        transition={{ duration: 2 }}
      />
    </motion.div>
  );
};

export default ImageModal;
