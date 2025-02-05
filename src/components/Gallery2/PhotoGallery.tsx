'use client';

import ImageGrid from '@/components/Gallery2/ImagesGrid';
import { useState } from 'react';
import ImageModal from '@/components/Gallery2/ImageModal';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <>
      <ImageGrid setSelectedImg={setSelectedImage} />
      {selectedImage && (
        <ImageModal selectedImg={selectedImage} setSelectedImg={setSelectedImage} />
      )}
    </>
  );
};

export default PhotoGallery;
