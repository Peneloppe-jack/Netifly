import React from "react";
import PropTypes from 'prop-types';
import { Card, Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFavoriteMovies } from '../../actions/actions.js';

import './movie-view.scss';

class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {
        FavoriteMovies: []
    };
}

onAddFavorite = (movie) => {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(`https://mysterious-wildwood-desperado.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
            FavoriteMovies: this.props.FavoriteMovies
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data)
            this.props.setFavoriteMovies(
               response.data.FavoriteMovies
            );
            console.log(response);
            alert("Movie Added to list");
            window.open('/profile', '_self');
        })
        .catch(function (error) {
            console.log(error);
        });
};
  
  render () {
    const { movie, onBackClick} = this.props;

return (
  <Container>
    <Row>
      <Col> 

              <Card className="movie-view">
                  <Card.Body>
                      <Card.Img id="movie-view-image" variant="top" src={movie.ImageURL}/>
                      <Card.Title id="movie-title" className="movie-title">{movie.Title}</Card.Title>
                      <Card.Text id="movie-description" className="movie-description">
                        {movie.Description}</Card.Text>
                      
                      <Link to={`/director/${movie.Director.Name}`}>
                      <Button variant="link" id="movie-director" className="movie-director">
                      Director: {movie.Director.Name}</Button>
                      </Link>

                      <Link to={`/genre/${movie.Genre.Name}`}>
                      <Button variant="link" id="movie-genre" className="movie-gerne">
                      Genre: {movie.Genre.Name}</Button>
                      </Link>

                  </Card.Body>
              </Card>
              <Button id="movie-view-button" onClick={() => { onBackClick(); }}>Back</Button>
              <Link to={`/movies/${movie._id}`}>
              <Button variant="primary" value={movie._id} onClick={() => this.onAddFavorite(movie)}>Add to Favorite</Button>
              </Link>
               </Col>
    </Row>
    </Container>
  );
}}


MovieView.propTypes = {

  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,

      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,

      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
      }).isRequired,

}).isRequired,

  onBackClick: PropTypes.func.isRequired
};

const mapStateToProps = ( state, ownProps) => {
  return { movie: ownProps.movie, FavoriteMovies: state.FavoriteMovies }
}

mapDispatchToProps = dispatch => {
  return bindActionCreators({ setFavoriteMovies: setFavoriteMovies }, dispatch)
}
    
export default connect(mapStateToProps, mapDispatchToProps)(MovieView);

