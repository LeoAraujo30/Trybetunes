import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
    };
  }

  inpChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { artist } = this.state;
    const MIN = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="artist">
          <input
            type="text"
            id="artist"
            name="artist"
            data-testid="search-artist-input"
            value={ artist }
            onChange={ this.inpChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artist.length < MIN }
            // onClick={ logChange }
          >
            Pesquisar
          </button>
        </label>
      </div>
    );
  }
}

Search.propTypes = {
  // inpChange: PropTypes.func.isRequired,
};

export default Search;
