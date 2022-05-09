import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
    <Card className="bg-light text-black" border='danger' style={{ width: '20rem', height: '20rem',margin: '.5rem' }}>
    <Card.Img  variant="top" src={movie.ImageURL} crossOrigin="true" style={{width: '8rem', height: '12rem'}}/>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${movie._id}`}>
        <Button variant="link">More details</Button>
        </Link>
        <Button id="movie-view-button" onClick={() => { }}>Add to favorites</Button>
        </Card.Body>
      </Card>

    );
  }
}


MovieCard.propTypes = {

  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
export default MovieCard;