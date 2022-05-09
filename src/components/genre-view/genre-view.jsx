import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import './genre-view.scss'

export class GenreView extends React.Component{
  

  render() {
    const{ genre, onBackClick} = this.props;

    return (
      <><Row>
          <Col med={4} className="genre-view bg-light text-black" style={{marginTop: 150}}>
          <div className="genre-name" />
          <span className="label">Genre: </span>
          <span className="value">{genre.Name}</span>
          </Col>
        </Row>
        <Row>
          <Col med={4} className="genre-view bg-light text-black">
          <div className="genre-description" />
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
          </Col>
        </Row>
        <Row>
          <Col>
          
            <Button  onClick={() => { onBackClick(null); } } variant="danger"> Back</Button>
            <Link to={`/`}>
              <Button className="custom-btn" type="submit">
                Back to List
              </Button>
            </Link>
      
          </Col>
        </Row>
        </>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};