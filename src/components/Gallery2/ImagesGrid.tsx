import React from 'react';
import { motion } from 'framer-motion';
import useFirestore from '@/components/Gallery2/useFirestore';
import { DocumentData } from 'firebase/firestore/lite';
import './photo-gallery.css';

export interface ImageGridProps {
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageGrid = ({ setSelectedImg }: ImageGridProps) => {
  const { images } = useFirestore('images');

  return (
    <div className="img-grid" key="image-grid-box-key">
      {images &&
        images.map((doc: DocumentData, index) => (
          <motion.div
            className="img-wrap"
            key={`image-grid-div-${index}`}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelectedImg(doc.url)}
          >
            <motion.img
              src={doc.url}
              key={`image-grid-img-${index}`}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;

/*
return (
    <div className="img-grid">
      {docs && docs.map(doc => (
        <motion.div className="img-wrap" key={doc.id}
          layout
          whileHover={{ opacity: 1 }}
          onClick={() => setSelectedImg(doc.url)}
        >
          <motion.img src={doc.url} alt="uploaded pic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  )
 */
