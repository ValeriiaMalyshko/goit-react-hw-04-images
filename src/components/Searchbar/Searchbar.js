import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from './search.svg';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Searchbar extends Component {
  state = { searchQuery: '' };

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const query = this.state.searchQuery.trim();

    if (query === '') {
      return Notify.warning('Please, fill the main field');
    }

    this.props.onSubmit(query);
    // this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <SearchIcon width="35" height="35" />
            <span className={s.label}>Search</span>
          </button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
