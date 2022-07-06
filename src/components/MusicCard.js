import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      valueChecked: false,
    };
  }

  componentDidMount() {
    const { favorites, trackName } = this.props;
    this.setState({
      valueChecked: favorites.some((music) => music.trackName === trackName),
    });
  }

  checkedValue = ({ target }) => {
    const value = target.checked;
    this.setState({
      valueChecked: value,
    });
  }

  render() {
    const {
      trackId,
      trackName,
      previewUrl,
      array,
      addFav,
      removeFav } = this.props;
    const [music] = array;
    const { valueChecked } = this.state;

    return (
      <div key={ trackId }>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {/* O seu navegador não suporta o elemento{" "} <code>audio</code>. */}
        </audio>
        <label htmlFor={ trackName }>
          <input
            type="checkbox"
            id={ trackName }
            name={ trackName }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ valueChecked }
            onClick={ this.checkedValue }
            onChange={ valueChecked ? () => removeFav(music) : () => addFav(music) }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
};

export default MusicCard;
