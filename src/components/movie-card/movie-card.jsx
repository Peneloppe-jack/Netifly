import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFavoriteMovies } from '../../actions/actions.js';


import { Link } from "react-router-dom";

class MovieCard extends React.Component {
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


render() {
    const { movie } = this.props;

    return (

<Card className="bg-light text-black" border='danger' style={{ width: '20rem',height: '20rem' }}>
<Card.Img variant="top" src={movie.ImageURL} crossOrigin="true" style={{ width: '8rem', height: '14rem' }} />
<Card.Title >{movie.Title}</Card.Title>
        <Link to={`/movies/${movie._id}`}>
        <Button variant="link">More details</Button>
        </Link>
        <Button variant="primary" value={movie._id} onClick={() => this.onAddFavorite(movie)}>Add to Favorite</Button>
        </Card>

); 
}}

    MovieCard.propTypes = {
      movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImageURL: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
          Name: PropTypes.string.isRequired
        })
      }).isRequired
    };
    
  
const mapStateToProps = ( state, ownProps) => {
      return { movie: ownProps.movie, FavoriteMovies: state.FavoriteMovies }
  }
  
  mapDispatchToProps = dispatch => {
      return bindActionCreators({ setFavoriteMovies: setFavoriteMovies }, dispatch)
  }
      
  
  export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);