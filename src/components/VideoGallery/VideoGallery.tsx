'use client';

import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
//import '../../../stylesheets/carousel.css';
import { Box } from '@mui/material';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import ImageGallery from 'react-image-gallery';
import './video-gallery.scss';

const YoutubeSlide = ({ url, isSelected }: { url: string; isSelected?: boolean }) => (
  <ReactPlayer width="100%" url={url} playing={isSelected} muted controls />
);

const items = [
  {
    original: 'https://www.youtube.com/embed/89c0wuxFcog',
    thumbnail: 'https://www.youtube.com/embed/89c0wuxFcog',
    originalAlt: '',
    thumbnailAlt: '',
    index: 0
  },
  {
    original: 'https://www.youtube.com/embed/kvGI2pc3JzU',
    thumbnail: 'https://www.youtube.com/embed/kvGI2pc3JzU',
    originalAlt: '',
    thumbnailAlt: '',
    index: 1
  },
  {
    original: 'https://www.youtube.com/embed/5D9a2_sOnJ8',
    thumbnail: 'https://www.youtube.com/embed/5D9a2_sOnJ8',
    originalAlt: '',
    thumbnailAlt: '',
    index: 2
  },
  {
    original: 'https://www.youtube.com/embed/H--DV5Q2xbc',
    thumbnail: 'https://www.youtube.com/embed/H--DV5Q2xbc',
    originalAlt: '',
    thumbnailAlt: '',
    index: 3
  },
  {
    original: 'https://www.youtube.com/embed/xTtC7e34rD4',
    thumbnail: 'https://www.youtube.com/embed/xTtC7e34rD4',
    originalAlt: '',
    thumbnailAlt: '',
    index: 4
  }
];

const VideoGallery = () => {
  const refImg = useRef(null);
  //const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;

  const getVideoThumb = (videoId) => `https://img.youtube.com/vi/${videoId}/default.jpg`;

  const getVideoId = (url) => url.substr('https://www.youtube.com/embed/'.length, url.length);

  /*const customRenderThumb = (children) =>
    children.map((item) => {
      const videoId = getVideoId(item.props.url);
      return (
        <img src={getVideoThumb(videoId)} alt={'Allied Yacht Transport, LLC'} key={item.key} />
      );
    });*/
  const customRenderThumb = (item) => {
    // eslint-disable-next-line no-console
    console.log('customRenderThumb(). item: ', item);

    const videoId = getVideoId(item.original);
    // eslint-disable-next-line no-console
    console.log('videoId: ', videoId);
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={getVideoThumb(videoId)} alt={'Allied Yacht Transport, LLC'} key={item?.key} />;
  };

  const customRenderItem = (item) => {
    // eslint-disable-next-line no-console
    console.log('customRenderItem().  item: ', item);
    // eslint-disable-next-line no-console
    console.log('refImg: ', refImg);

    return (
      <YoutubeSlide
        key={item?.key}
        url={item.original}
        isSelected={refImg?.current?.state?.currentIndex == item.index}
      />
    );
  };

  return (
    <div>
      <Box id="photo-gallery-section" sx={centeredSectionSx}>
        <SectionTitle title="Video Gallery" />
        <ImageGallery
          ref={refImg}
          showPlayButton={false}
          items={items}
          infinite={true}
          showBullets={true}
          showThumbnails={true}
          flickThreshold={30}
          lazyLoad={false}
          renderItem={customRenderItem}
          //renderThumb={customRenderThumb}
          renderThumbInner={customRenderThumb}
        />
      </Box>
    </div>
  );
};

export default VideoGallery;
