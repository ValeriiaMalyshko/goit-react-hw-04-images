import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './Gallery.module.css';

export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={s.gallery}>
      {images.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          smallImg={webformatURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
