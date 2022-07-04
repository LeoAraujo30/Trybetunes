import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
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
      </header>
    );
  }
}

export default Header;