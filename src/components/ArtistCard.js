import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ArtistCard extends React.Component {
  render() {
    const { albuns } = this.props;
    return (
      <div>
        { albuns.map((art) => {
          const { collectionId, artistName, collectionName, artworkUrl100 } = art;
          return (
            <div key={ collectionId }>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <h3>{ collectionName }</h3>
              <h4>{ artistName }</h4>
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                OpenAlbum
              </Link>
            </div>
          );
        }) }
      </div>
    );
  }
}

ArtistCard.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ArtistCard;
