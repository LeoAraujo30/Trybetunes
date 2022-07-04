import React from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
      login: false,
    };
  }

  inpChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  logChange = async () => {
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    this.setState({
      login: true,
    });
  }

  render() {
    const { userName, loading, login } = this.state;
    const MIN = 3;
    if (login === true) return <Redirect to="/search" />;
    if (loading === true) return <Loading />;
    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="userName"
            data-testid="login-name-input"
            value={ userName }
            onChange={ this.inpChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ userName.length < MIN }
            onClick={ this.logChange }
          >
            Entrar
          </button>
        </label>
      </div>
    );
  }
}

// Login.propTypes = {
//   userName: PropTypes.string.isRequired,
//   loading: PropTypes.bool.isRequired,
//   login: PropTypes.bool.isRequired,
//   inpChange: PropTypes.func.isRequired,
//   logChange: PropTypes.func.isRequired,
// };

export default Login;
