import React from 'react';
import PropTypes from 'prop-types';
import s from './Gallery.module.css';

export default function ImageGalleryItem({ smallImg, id, openModal }) {
  return (
    <li className={s.item} onClick={() => openModal(id)}>
      <img className={s.itemImage} src={smallImg} alt="" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
};
