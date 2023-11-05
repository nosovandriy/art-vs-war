'use client';

import { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';

import { ArtProcess } from '@/types/Painting';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
import NextJsImage from './nextjs-images/nextjs-images';

type Props = {
  artProcessImages: ArtProcess[];
  onOpen: any;
  setSelectedImageId: any;
};

const ArtProcessGallery: React.FC<Props> = ({ artProcessImages, onOpen, setSelectedImageId }) => {
  const [index, setIndex] = useState(-1);

  const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

  const photosList = artProcessImages.map((photo) => ({
    id: photo.id,
    src: photo.imageUrl,
    width: photo.imageWidth,
    height: photo.imageHeight,
    srcSet: breakpoints.map((breakpoint) => {
      const height = Math.round((photo.imageHeight / photo.imageWidth) * breakpoint);
      return {
        src: photo.imageUrl,
        width: breakpoint,
        height,
      };
    }),
  }));

  const handleOnClick = (event: any) => {
    const icon = event.event.target.closest('[data-custom-attribute="trash-icon"]');

    if (icon) {
      setSelectedImageId(event.photo.id);
      onOpen();
    } else {
      setIndex(event.index);
    }
  };

  return (
    <>
      <PhotoAlbum
        onClick={(event) => handleOnClick(event)}
        columns={(containerWidth) => {
          if (containerWidth < 480) {
            return 2;
          } else if (containerWidth < 768) {
            return 3;
          } else if (containerWidth < 1024) {
            return 4;
          } else return 4;
        }}
        photos={photosList}
        layout="columns"
        renderPhoto={NextJsImage}
        sizes={{
          size: 'calc(100vw - 40px)',
          sizes: [
            { viewport: '(max-width: 299px)', size: 'calc(100vw - 10px)' },
            { viewport: '(max-width: 599px)', size: 'calc(100vw - 20px)' },
            { viewport: '(max-width: 1199px)', size: 'calc(100vw - 30px)' },
          ],
        }}
      />
      <Lightbox index={index} slides={photosList} open={index >= 0} close={() => setIndex(-1)} />
    </>
  );
};

export default ArtProcessGallery;
