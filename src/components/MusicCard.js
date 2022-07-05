import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { albumMusics } = this.props;
    const musics = albumMusics.filter((music) => music.trackName);
    return (
      <div>
        { musics.map((music) => {
          const { trackId, trackName, previewUrl } = music;
          return (
            <div key={ trackId }>
              <h4>{ trackName }</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                {/* O seu navegador não suporta o elemento{" "} <code>audio</code>. */}
              </audio>
            </div>
          );
        }) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumMusics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
