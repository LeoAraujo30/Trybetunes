import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const obj = await getUser();
    this.setState({
      user: obj.name,
    });
  }

  render() {
    const { user } = this.state;

    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { user.length === 0 ? <Loading /> : user }
        </p>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
