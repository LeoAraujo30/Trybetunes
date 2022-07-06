import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      favorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getAlbum();
    this.getFavorites();
  }

  getAlbum = async () => {
    const { match } = this.props;
    const array = await getMusics(match.params.id);
    this.setState({
      musics: array,
    });
    // console.log(this.props, this.state);
  }

  getFavorites = async () => {
    await this.setState({
      loading: true,
    });
    const array = await getFavoriteSongs();
    await this.setState({
      favorites: array,
      loading: false,
    });
  }

  addFav = async (music) => {
    await this.setState({
      loading: true,
    });
    await addSong(music);
    const array = await getFavoriteSongs();
    await this.setState({
      favorites: array,
      loading: false,
    });
    // console.log(await getFavoriteSongs());
    // console.log('atualizando favoritos');
  }

  removeFav = async (music) => {
    await this.setState({
      loading: true,
    });
    await removeSong(music);
    const array = await getFavoriteSongs();
    await this.setState({
      favorites: array,
      loading: false,
    });
    // console.log(await getFavoriteSongs());
    // console.log('atualizando favoritos');
  }

  render() {
    const { musics, favorites, loading } = this.state;
    const albumMusics = musics.filter((music) => music.trackName);
    if (loading === true) {
      return (
        <div>
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        { musics.length === 0
          ? <h2 data-testid="artist-name">Carregando...</h2>
          : <h2 data-testid="artist-name">{ musics[0].artistName }</h2> }
        { musics.length === 0
          ? <h3 data-testid="album-name">Carregando...</h3>
          : <h3 data-testid="album-name">{ musics[0].collectionName }</h3> }
        { albumMusics.map((music) => {
          const { trackId, trackName, previewUrl } = music;
          const array = [music];
          return (
            <MusicCard
              key={ trackName }
              trackId={ trackId }
              trackName={ trackName }
              previewUrl={ previewUrl }
              array={ array }
              favorites={ favorites }
              addFav={ this.addFav }
              removeFav={ this.removeFav }
            />
          );
        }) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.exact({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Album;
