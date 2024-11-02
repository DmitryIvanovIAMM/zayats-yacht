'use client';

import React from 'react';
import { Box } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ImageGallery from 'react-image-gallery';
import './gallery.scss';

import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';

// https://www.npmjs.com/package/react-image-gallery
const images = [
  {
    original: 'https://alliedyacht.s3.amazonaws.com/gallery-image-8-85kB.jpg',
    thumbnail: 'https://alliedyacht.s3.amazonaws.com/gallery-image-8-85kB.jpg',
    originalAlt: 'gallery-image-8',
    thumbnailAlt: 'gallery-image-8',
    loading: 'lazy'
  },
  {
    original: 'https://live.staticflickr.com/65535/51430010012_29b9bb2a31_b.jpg',
    thumbnail: 'https://live.staticflickr.com/65535/51438006839_e64118b989_o.jpg',
    originalAlt: 'gallery-image-1',
    thumbnailAlt: 'gallery-image-1',
    loading: 'lazy'
  },
  {
    original: 'https://live.staticflickr.com/65535/51430770761_52405b928a_b.jpg',
    thumbnail: 'https://live.staticflickr.com/65535/51438224350_bbb9c4f5db_o.jpg',
    originalAlt: 'gallery-image-2',
    thumbnailAlt: 'gallery-image-2',
    loading: 'lazy'
  },
  {
    original: 'https://alliedyacht.s3.amazonaws.com/gallery-image-3-250kB.jpg',
    thumbnail: 'https://alliedyacht.s3.amazonaws.com/gallery-image-3-250kB.jpg',
    originalAlt: 'gallery-image-3',
    thumbnailAlt: 'gallery-image-3',
    loading: 'lazy'
  },
  {
    original: 'https://alliedyacht.s3.amazonaws.com/gallery-image-4-460kB.jpg',
    thumbnail: 'https://alliedyacht.s3.amazonaws.com/gallery-image-4-460kB.jpg',
    originalAlt: 'gallery-image-4',
    thumbnailAlt: 'gallery-image-4',
    loading: 'lazy'
  },
  {
    original: 'https://live.staticflickr.com/65535/51431005458_b09d917564_o.jpg',
    thumbnail: 'https://live.staticflickr.com/65535/51438194770_c0b0c652d0_o.jpg',
    originalAlt: 'gallery-image-5',
    thumbnailAlt: 'gallery-image-5',
    loading: 'lazy'
  },
  {
    original: 'https://live.staticflickr.com/65535/51431005438_68d9c4717e_o.jpg',
    thumbnail: 'https://live.staticflickr.com/65535/51437975454_8549d1c32d_o.jpg',
    originalAlt: 'gallery-image-6',
    thumbnailAlt: 'gallery-image-6',
    loading: 'lazy'
  },
  {
    original: 'https://alliedyacht.s3.amazonaws.com/gallery-image-7-360kB.jpg',
    thumbnail: 'https://alliedyacht.s3.amazonaws.com/gallery-image-7-360kB.jpg',
    originalAlt: 'gallery-image-7',
    thumbnailAlt: 'gallery-image-7'
  },
  {
    original: 'https://alliedyacht.s3.amazonaws.com/gallery-image-9-430kb.jpg',
    thumbnail: 'https://alliedyacht.s3.amazonaws.com/gallery-image-9-430kb.jpg',
    originalAlt: 'gallery-image-9',
    thumbnailAlt: 'gallery-image-9',
    loading: 'lazy'
  },
  {
    original: 'https://alliedyacht.s3.amazonaws.com/gallery-image-10-222kB.jpg',
    thumbnail: 'https://alliedyacht.s3.amazonaws.com/gallery-image-10-222kB.jpg',
    originalAlt: 'gallery-image-10',
    thumbnailAlt: 'gallery-image-10',
    loading: 'lazy'
  },
  {
    original: 'https://live.staticflickr.com/65535/51430770766_8a298b092b_o.jpg',
    thumbnail: 'https://live.staticflickr.com/65535/51437485548_9faf6e0875_o.jpg',
    originalAlt: 'gallery-image-11',
    thumbnailAlt: 'gallery-image-11',
    loading: 'lazy'
  }
];

const Gallery = () => {
  return (
    <Box id="photo-gallery-section" sx={centeredSectionSx}>
      <SectionTitle title="Gallery" />
      <ImageGallery
        showPlayButton={false}
        items={images}
        infinite={true}
        showBullets={true}
        flickThreshold={30}
        lazyLoad={false}
      />
    </Box>
  );
};

export default Gallery;
