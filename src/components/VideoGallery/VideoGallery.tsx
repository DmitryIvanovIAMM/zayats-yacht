'use client';

import React, { useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Box } from '@mui/material';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ImageGallery from 'react-image-gallery';
import './video-gallery.scss';
import { InView } from 'react-intersection-observer';

interface VideoItem {
  original: string;
  thumbnail: string;
  originalAlt: string;
  thumbnailAlt: string;
  index: number;
}

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
  const refImg: any = useRef(null);

  const getVideoThumb = (videoId: string) => `https://img.youtube.com/vi/${videoId}/default.jpg`;

  const getVideoId = (url: string): string =>
    url.substr('https://www.youtube.com/embed/'.length, url.length);

  /*const customRenderThumb = (children) =>
    children.map((item) => {
      const videoId = getVideoId(item.props.url);
      return (
        <img src={getVideoThumb(videoId)} alt={'Allied Yacht Transport, LLC'} key={item.key} />
      );
    });*/
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const customRenderThumb = (item: VideoItem) => {
    // eslint-disable-next-line no-console
    console.log('customRenderThumb(). item: ', item);

    const videoId = getVideoId(item.original);
    // eslint-disable-next-line no-console
    console.log('videoId: ', videoId);
    return (
      <img
        src={getVideoThumb(videoId)}
        alt={'Allied Yacht Transport, LLC'}
        key={item?.original}
        width="93px"
        height="93px"
        style={{ marginTop: '2px' }}
      />
    );
  };

  const customRenderItem = (item: VideoItem) => {
    return (
      <ReactPlayer
        width="100%"
        url={item.original}
        playing={refImg?.current?.state?.currentIndex == item.index}
        muted
        controls
        fallback={
          <div>
            <h6>Video not found</h6>
          </div>
        }
      />
    );
  };

  return (
    <Box id="photo-gallery-section" sx={centeredSectionSx}>
      <SectionTitle title="Video Gallery" />
      <InView triggerOnce={true} initialInView={false}>
        {({ inView, ref }) => {
          return (
            <Box ref={ref} sx={{ width: '100%', maxWidth: '100%' }}>
              {inView ? (
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
                  renderThumbInner={customRenderThumb}
                />
              ) : null}
            </Box>
          );
        }}
      </InView>
    </Box>
  );
};

export default VideoGallery;
