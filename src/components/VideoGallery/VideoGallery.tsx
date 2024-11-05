'use client';

import React, { useRef } from 'react';
///import ReactPlayer from 'react-player';
import ReactPlayer from 'react-player/youtube';
//import '../../../stylesheets/carousel.css';
import { Box } from '@mui/material';
import { centeredSectionSx } from '@/components/AboutUs/AboutUs';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ImageGallery from 'react-image-gallery';
import './video-gallery.scss';
import 'lazysizes';
import { InView } from 'react-intersection-observer';

/*const YoutubeSlide = ({ url, isSelected }: { url: string; isSelected?: boolean }) => (
  <ReactPlayer width="100%" url={url} playing={isSelected} muted controls />
);*/

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
  //const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;

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
      <img src={getVideoThumb(videoId)} alt={'Allied Yacht Transport, LLC'} key={item?.original} />
    );
  };

  const customRenderItem = (item: VideoItem) => {
    // eslint-disable-next-line no-console
    console.log('customRenderItem().  item: ', item);
    // eslint-disable-next-line no-console
    console.log('refImg: ', refImg);

    return (
      <div className="lazyload">
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
          config={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            youtube: { className: 'lazyload' }
          }}
          // eslint-disable-next-line react/no-unknown-property
          className="lazyload"
        />
      </div>
      /*<iframe
        data-src={item.original}
        // eslint-disable-next-line react/no-unknown-property
        className="lazyload"
        // eslint-disable-next-line react/no-unknown-property
        frameBorder="0"
        allowFullScreen
      ></iframe>*/
    );

    /*<YoutubeSlide
        key={item?.original}
        url={c}
        isSelected={refImg?.current?.state?.currentIndex == item.index}
      />*/
  };

  return (
    <InView delay={5000}>
      {({ inView, ref, entry }) => {
        // eslint-disable-next-line no-console
        console.log('inView: ', inView);

        return (
          <div ref={ref}>
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
      }}
    </InView>
  );
};

export default VideoGallery;
