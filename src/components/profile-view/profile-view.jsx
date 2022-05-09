import React from "react";
//import "./profile-view.scss";
import PropTypes from "prop-types";
import { Container, Card, Button, Row, Col, Form, FormGroup, FormControl } from "react-bootstrap";
import axios from "axios";

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
        window.open('/', '_self');
    }

    getUser(token) {
        const Username = localStorage.getItem('user');

        axios.get(`https://mysterious-wildwood-desperado.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://mysterious-wildwood-desperado.herokuapp.com/users/${Username}`,
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday
                });

                localStorage.setItem('user', this.state.Username);
                alert("Profile updated");
                window.open('/profile', '_self');
            });
    };

    onRemoveFavorite = (e, movie) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://mysterious-wildwood-desperado.herokuapp.com/users/${Username}/movies/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then((response) => {
                console.log(response);
                alert("Movie removed");
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onDeleteUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://movieanorak.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                alert("Profile deleted");
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setUsername(value) {
        this.setState({
            Username: value
        });
    }

    setPassword(value) {
        this.setState({
            Password: value
        });
    }

    setEmail(value) {
        this.setState({
            Email: value
        });
    }

    setBirthday(value) {
        this.setState({
            Birthday: value
        });
    }

    render() {
        const { movies, onBackClick } = this.props;
        const { FavoriteMovies, Username, Email, Birthday } = this.state;

        if (!Username) {
            return null;
        }

        return (
           
            <Container fluid>
 

 <Row>
  <Col sx>

                <Row>
                <Col xs ={12} sm={4}>
                <Card className="Profile Info" style={{ textAlign: 'left'}} >
                            <Card.Body>
                                <Card.Title>Profile Info </Card.Title>
                                    <p> Username</p>
                                </Card.Body>
                                </Card>
                                </Col>
                                
                            </Row>
                            <Row>               
                            <Col xs ={12} sm={8}>
                              <Card>
                              <Card.Body>
                                  <Form className="Update"style={{ textAlign: 'left'}}
                                
                                    onSubmit={(e) =>
                                        this.editUser(
                                            e,
                                            this.Username,
                                            this.Password,
                                            this.Email,
                                            this.Birthday
                                        )
                                    }
                                >
                                
                                    <FormGroup>
                                        <Form.Label>Username</Form.Label>
                                        <FormControl
                                            type="text"
                                            name="Username"
                                            placeholder="New Username"
                                            value={Username}
                                            onChange={(e) => this.setUsername(e.target.value)}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Form.Label>Password</Form.Label>
                                        <FormControl
                                            type="password"
                                            name="Password"
                                            placeholder="New Password"
                                            value=""
                                            onChange={(e) => this.setPassword(e.target.value)}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Form.Label>Email</Form.Label>
                                        <FormControl
                                            type="email"
                                            name="Email"
                                            placeholder="Enter Email"
                                            value={Email}
                                            onChange={(e) => this.setEmail(e.target.value)}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Form.Label>Birthday</Form.Label>
                                        <FormControl
                                            type="date"
                                            name="Birthday"
                                            value={Birthday}
                                            onChange={(e) => this.setBirthdaye(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <div>
                                        <Button variant="success" type="submit" onClick={this.editUser}>Update Data</Button>
                                    
                                        <Button variant="secondary" onClick={() => this.onDeleteUser()}>Delete Profile</Button>
                                    <p> 
                                        *Updates will be displayed after next Login
                                    </p>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                     <Col xs = {2}>
                        <h4> Favorites Movies</h4>
                     
                        <Card>
                            <Card.Body>
                                {FavoriteMovies.length === 0 && (
                                    <div className="text-center">No favorite movies</div>
                                )}
                                <Row className="favorite-movies-container">
                                    {FavoriteMovies.length > 0 && movies.map((movie) => {
                                        if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)
                                        ) {
                                            return (
                                                <Card sx={12} md= {6}lg={3} className="favorite-movie" key={movie._id} >
                                                    <Card.Img
                                                        className="favorite-movie-image"
                                                        variant="top"
                                                        src={movie.ImageURL}
                                                    />
                                                    <Card.Body>
                                                        <Card.Title className="movie-title">
                                                            {movie.Title}
                                                        </Card.Title>
                                                        <Button value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove from List</Button>
                                                    </Card.Body>
                                                </Card>
                                            );
                                        }
                                    })}
                                </Row>
                            </Card.Body>
                        </Card>
                  
                    </Col>
                </Row>
                </Col>
                </Row>
                
            </Container>
        )
    }
}


ProfileView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageURL: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.shape({
            Bio: PropTypes.string.isRequired,
         
        }).isRequired,
    })).isRequired,
    onBackClick: PropTypes.func.isRequired
}