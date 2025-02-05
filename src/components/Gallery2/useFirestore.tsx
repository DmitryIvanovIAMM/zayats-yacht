import { useState, useEffect } from 'react';
import { db } from '@/utils/firestore';
import { collection, getDocs, DocumentData } from 'firebase/firestore/lite';

const useFirestore = (collectionName: string) => {
  const [images, setImages] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getImagesCollections = async () => {
      const imagesCollection = collection(db, 'images');
      const imagesSnapshot = await getDocs(imagesCollection);
      const imagesList = imagesSnapshot.docs
        .map((doc) => doc.data())
        .sort((a, b) => b.createdAt - a.createdAt);
      setImages(imagesList);
    };

    getImagesCollections();
  }, [collectionName]);

  return { images };
};

export default useFirestore;
