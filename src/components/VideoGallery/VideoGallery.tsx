'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player/youtube';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ImageGallery from 'react-image-gallery';
import './video-gallery.scss';

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const customRenderThumb = (item: VideoItem) => {
    // eslint-disable-next-line no-console
    console.log('customRenderThumb(). item: ', item);

    const videoId = getVideoId(item.original);
    // eslint-disable-next-line no-console
    console.log('videoId: ', videoId);
    return (
      <Image
        src={getVideoThumb(videoId)}
        alt={'Allied Yacht Transport, LLC'}
        key={item?.original}
        height={50}
        width={73}
        style={{ marginTop: '3px' }}
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
  );
};

export default VideoGallery;
