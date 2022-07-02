import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

class Login extends React.Component {
  render() {
    const { userName, loading, login, inpChange, logChange } = this.props;
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
            onChange={ inpChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ userName.length < MIN }
            onClick={ logChange }
          >
            Entrar
          </button>
        </label>
      </div>
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  login: PropTypes.bool.isRequired,
  inpChange: PropTypes.func.isRequired,
  logChange: PropTypes.func.isRequired,
};

export default Login;
