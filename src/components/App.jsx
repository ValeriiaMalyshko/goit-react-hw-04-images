import React, { useState, useEffect, useRef } from 'react';
import s from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './Gallery/ImageGallery';
import imagesApi from '../services/API';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const largeImageURL = useRef('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImagesUse = () => {
      const options = { currentPage, searchQuery };
      setLoading(true);

      imagesApi(options)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            return Notify.warning(
              'Sorry, there are no images matching your search query. Please try again'
            );
          }

          if (totalHits === 0) {
            return Notify.info(
              'We are sorry, but you have reached the end of search results.'
            );
          }

          const newImages = hits.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          });

          setImages([...images, ...newImages]);
          setTotal(totalHits);
          setCurrentPage(currentPage + 1);
        })
        .catch(error => setError(error))
        .finally(setLoading(false));
      setShowMore(false);
    };
    if (searchQuery === '') {
      return;
    }
    if (showMore) {
      fetchImagesUse();
    }
  }, [currentPage, images, searchQuery, showMore]);

  const loadMore = () => {
    setShowMore(true);
  };

  const handleFormSubmit = query => {
    setImages([]);
    setSearchQuery(query);
    // setLargeImageURL('');
    setCurrentPage(1);
    setTotal(0);
    setShowModal(false);
    setShowMore(true);
    setLoading(false);
    setError(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = searchId => {
    const image = images.find(image => image.id === searchId);
    largeImageURL.current = image.largeImageURL;
    toggleModal();
  };

  return (
    <div className={s.App}>
      {error && Notify.failure('Sorry, there is some error')}
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <h1>Loading</h1>}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {images.length > 0 && !loading && images.length !== total && (
        <Button onClick={loadMore} />
      )}
      {showModal && (
        <Modal onClose={toggleModal} largeImage={largeImageURL.current} />
      )}
    </div>
  );
}
