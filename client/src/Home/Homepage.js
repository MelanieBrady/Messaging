import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Homepage.css';

import {
    Link,
} from 'react-router-dom';

class HomePage extends React.Component {
    //description, city, friendslist
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            newPassword: "",
            usernameSearch: "",
            usernameSearchSubmitted: false,
            loggedIn: false,
        }
    }

    handleUsernameSearchSubmit = (event) => {
        console.log(this.state.usernameSearch);
        this.setState({ usernameSearchSubmitted: true });
    }

    componentDidMount() {
        const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        console.log(loggedIn);
        if (loggedIn) {
            this.setState({ loggedIn: true });
        }
    }

    // Allows for users to log out!
    handleLogOutSubmit = (event) => {
        this.setState({ loggedIn: false });
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('token', null);
        localStorage.setItem('username', null);
    }

    // Allows for the user to reset password
    handlePasswordReset = (event) => {
        event.preventDefault();
        axios.post('http://3.135.218.245:3001/reset', {
            username: this.state.username,
            password: this.state.password,
            newPassword: this.state.newPassword,
        }).then((res) => {
            this.setState({ loggedIn: false });
        });
    }

    render() {

        if (this.state.loggedIn) {
            // Add more to the logged in 
            if (this.state.usernameSearchSubmitted) {
                return (
                    <Redirect to={`/profile/${this.state.usernameSearch}`} />
                );
            }

            return (
                <div>
                    <Form onSubmit={this.handleUsernameSearchSubmit}>
                        <Form.Group controlId="formUsernameSearch">
                            <Form.Control type="" placeholder="Search for Username"
                                onChange={(e) => this.setState({ usernameSearch: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" block size="sm" type="submit">
                            Search
                        </Button>
                        <Button variant="primary" block size="sm" onClick={this.handlePasswordReset}>
                            Reset Password
                        </Button>
                        <Button variant="primary" block size="sm" onClick={this.handleLogOutSubmit}>
                            Log Out
                        </Button>
                    </Form>
                </div>
            );

        } else {
            return (
                <div>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href="#"></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item active"> <Link to="/login">Login</Link> </li>
                                <li class="nav-item"> <Link to="/register">Register</Link>
                                </li>
                            </ul>
                            <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search for user" aria-label="Search"> </input>
                                <button class="btn btn-outline-success my-2 my-sm-0" onClick={this.handleLogOutSubmit}>Search</button>
                            </form>
                        </div>
                    </nav>
                </div>
            );
        }
    }
};

export default HomePage;