import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum = async () => {
    const { match } = this.props;
    const array = await getMusics(match.params.id);
    this.setState({
      musics: array,
    });
    console.log(this.props, this.state);
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { musics.length === 0
          ? <h2 data-testid="artist-name">Carregando...</h2>
          : <h2 data-testid="artist-name">{ musics[0].artistName }</h2> }
        { musics.length === 0
          ? <h3 data-testid="album-name">Carregando...</h3>
          : <h3 data-testid="album-name">{ musics[0].collectionName }</h3> }
        <MusicCard albumMusics={ musics } />
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
