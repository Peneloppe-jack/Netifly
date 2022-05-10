import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';


//import { Button } from '../button-view/button-view';

//import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { RegistrationView } from '../registration-view/registration-view.jsx';
import { GenreView } from "../genre-view/genre-view.jsx";
import { DirectorView } from "../director-view/director-view.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { NavbarView } from "../navbar-view/navbar-view.jsx";

import './main-view.scss'

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
        user: null
    };
}

getMovies(token) {
    axios.get('https://mysterious-wildwood-desperado.herokuapp.com/movies', {
      headers: { Authorization:`Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
  })
  .catch(function (error) {
      console.log(error);
  });
}

componentDidMount() {
  let acessToken = localStorage.getItem('token');
  if (acessToken !== null) {
      this.setState({
          user: localStorage.getItem('user')
      });
      this.getMovies(acessToken);
  }
}


onLoggedIn(authData) {
  console.log(authData);
  this.props.setUser(authData.user);

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}

onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.props.setUser(null);
}

render() {
  let { movies } = this.props;
  let { user } = this.state;
  return (
      <Router>
          <Button id="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          <Row>
              <NavbarView user={user} />
          </Row>
          <Row className="main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                  if (!user) return <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <MoviesList movies={movies} />;
              }} />

              <Route path="/register" render={() => {
                  if (user) return <Redirect to="/" />
                  return <Col>
                      <LoginView />
                  </Col>
              }} />

              <Route path="/movies/:movieId" render={({ match, history }) => {
                  if (!user) {
                      return (
                          <Col>
                              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                          </Col>
                      );
                  }
                  if (movies.length === 0) {
                      return <div className="movie-view" />;
                  }
                  return (
                      <Col md={8}>
                          <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                              onBackClick={() => history.goBack()} />
                      </Col>
                  );
              }} />


              <Route exact path="/profile" render={({ history }) => {
                  if (!user) {
                      return (
                          <Col>
                              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                          </Col>
                      );
                  }
                  return (
                      <Col md={8}>
                          <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                      </Col>
                  );
              }} />


              <Route path="/genre/:name" render={({ match, history }) => {
                  if (!user) {
                      return (
                          <Col>
                              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                          </Col>
                      );
                  }
                   if (movies.length === 0) {
                      return <div className="movie-view" />;
                  }
                  return (
                      <Col md={8}>
                          <GenreView
                              genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                              onBackClick={() => history.goBack()}
                              movies={movies.filter(movie => movie.Genre.Name === match.params.name)} />
                      </Col>
                  );
              }} />



              <Route path="/directors/:name" render={({ match, history }) => {
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                      <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                  </Col>
              }} />

              <Route path="/genres/:name" render={({ match, history }) => {
                  if (movies.length === 0) return <div className="main-view" />;
                  return <Col md={8}>
                      <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                  </Col>
              }} />


              <Route path='/users/:username'
              render={({ history, match }) => {
                  if (!user) return
                  <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  if (movies.length === 0) return <div className="main-view" />;

                  return <Col md={8}>
                      <ProfileView onBackClick={() => history.goBack()} movies={movies}
                      />
                  </Col>
    }} />
    </Row>
    </Router>
  );}}



let mapStateToProps = state => {
return { movies: state.movies }
}


export default connect(mapStateToProps, { setMovies })(MainView);