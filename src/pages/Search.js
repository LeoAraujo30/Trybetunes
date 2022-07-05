import React from 'react';
import ArtistCard from '../components/ArtistCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      artResult: '',
      loading: false,
      search: false,
      results: [],
    };
  }

  inpChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  searchArtist = async () => {
    const { artist } = this.state;
    const art = artist;
    this.setState({
      artist: '',
      artResult: art,
      loading: true,
    });
    const result = await searchAlbumsAPI(art);
    this.setState({
      loading: false,
      search: true,
      results: result,
    });
    // console.log(this.state);
  }

  render() {
    const { artist, artResult, loading, search, results } = this.state;
    const MIN = 2;
    if (loading === true) {
      return (
        <div>
          <Header />
          <Loading />
        </div>
      );
    }
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
            onClick={ this.searchArtist }
          >
            Pesquisar
          </button>
        </label>
        { search && <p>{ `Resultado de álbuns de: ${artResult}` }</p> }
        { results.length === 0 && search
          ? <p>Nenhum álbum foi encontrado</p>
          : <ArtistCard albuns={ results } /> }
      </div>
    );
  }
}

export default Search;
