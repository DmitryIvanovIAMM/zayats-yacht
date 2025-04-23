'use client';

import ImageGrid from '@/components/Gallery2/ImagesGrid';
import { useState } from 'react';
import ImageModal from '@/components/Gallery2/ImageModal';
import { useUser } from '@auth0/nextjs-auth0/client';
//import { useUser } from '@auth0/nextjs-auth0';
// import { useUser } from '@auth0/nextjs-auth0/client';
// //import { useUser } from '@auth0/nextjs-auth0/client';
// import { auth0 } from '@/lib/auth0';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { user } = useUser();
  console.log('PhotoGallery().  user: ', user);
  console.log('PhotoGallery().  user.roles: ', user?.roles);

  // const session = auth0.getSession();
  // console.log('PhotoGallery().  session: ', session);

  //const me = user?.roles.includes('me');

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
