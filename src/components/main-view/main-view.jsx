import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//import { Button } from '../button-view/button-view';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from "../genre-view/genre.view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";

import './main-view.scss'

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
    };
  }


getMovies(token) {
    axios.get('https://mysterious-wildwood-desperado.herokuapp.com/movies', {
      headers: { Authorization:`Bearer ${token}`}
    })
    .then((response) => {
      this.setState({
        movies: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
componentDidMount() {
  axios.get('https://mysterious-wildwood-desperado.herokuapp.com/movies')
  .then((response) => {
    this.setState({
      movies: response.data,
    });
  })
  .catch((error) => {
    console.log(error);
  });
}


componentDidMount() {
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
      this.setState({
          user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
  }
}

onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username,
  });
  localStorage.setItem("token", authData.token);
  localStorage.setItem("user", authData.user.Username);
  this.getMovies(authData.token);
}

onLoggedOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  this.setState({
    user: null,
  });
}


render() {
  const { movies, user } = this.state;

  return (
    <Router>

      <Row>
      <NavbarView user={user} />
      </Row>

      <Row className="main-view justify-content-md-center">

        <Route exact path="/" render={() => {
            if (!user) return <Col><LoginView onLoggedIn={(user) => this.onLoggedIn(user)} /> </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map((m) => (
              <Col> <MovieCard movie={m} /></Col>
            ));
          }}
        />

        <Route path="/login" render={() => {
                    if (user) return <Redirect to="/" />;
                    return <LoginView onLoggedIn = {data => this.onLoggedIn(data)} />  
                }}
                />

        <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />;
            return <Col lg={8} md={8}> <RegistrationView /></Col>  
          }}
        />


        <Route path="/movies/:movieId"render={({ match, history }) => {
            if (!user)
              return <Col> <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} /> </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return ( 
            <Col md={8}> <MovieView movie={movies.find((m) => m._id === match.params.movieId)} onBackClick={() => history.goBack()} /></Col>
            );  
          }}
        />


        <Route path="/genre/:name"render={({ match, history }) => {
            if (!user)
              return <Row><Col><LoginView onLoggedIn={(user) => this.onLoggedIn(user)} /></Col></Row>
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col> <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
              </Col>
            );
          }}
        />


        <Route path="/director/:name"render={({ match, history }) => {
            if (!user)
              return <Row> <Col> <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} /> </Col></Row>
            if (movies.length === 0) return <div className="main-view" />;

            return (
              <Col> <DirectorView director={ movies.find((m) => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            );
          }}
        />
        
        
        <Route exact path="/profile" render={({ history }) => {
            if (!user) {
            return <Col> <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            }
            return (
              <Col> <ProfileView movies={movies} onBackClick={() => history.goBack()} /> </Col>
           
            );
             }} />

        <Route path={`/users/${user}`} render={({ history }) => {
         if (!user)
        return <Redirect to="/" />
        return <Col> <ProfileView user={user} onBackClick={() => history.goBack()} />
        </Col>
         }} />

      </Row>
    </Router>
    );
  }
}
        
        export default MainView;