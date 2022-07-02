import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
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

  logChange = () => {
    const TIME = 2000;
    const { userName } = this.state;
    this.setState({
      loading: true,
    }, () => createUser({ name: userName }));
    setTimeout(() => {
      this.setState({
        login: true,
      });
    }, TIME);
  }

  render() {
    const { userName, loading, login } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login
              userName={ userName }
              loading={ loading }
              login={ login }
              inpChange={ this.inpChange }
              logChange={ this.logChange }
            />
          </Route>
          <Route path="/search" render={ () => <Search /> } />
          <Route path="/album/:id" render={ () => <Album /> } />
          <Route path="/favorites" render={ () => <Favorites /> } />
          <Route exact path="/profile" render={ () => <Profile /> } />
          <Route path="/profile/edit" render={ () => <ProfileEdit /> } />
          <Route path="" render={ () => <NotFound /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
