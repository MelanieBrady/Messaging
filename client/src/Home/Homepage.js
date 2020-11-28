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
                        <Button variant="primary" size="sm" type="submit"> My Profile </Button>
                        <Form.Group controlId="formUsernameSearch">
                            <Form.Control type="" placeholder="Search for Username"
                                onChange={(e) => this.setState({ usernameSearch: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" size="sm" type="submit"> Search </Button>
                        <Button variant="secondary" size="sm" onClick={this.handlePasswordReset}> Reset Password </Button>
                        <Button variant="secondary" size="sm" onClick={this.handleLogOutSubmit}> Log Out </Button>
                    </Form>
                </div>
            );

        } else {
            return (
                <div>
                    <p>this is the home page</p>
                    <div className="menu">
                        <ul>
                            <li> <Link to="/login">this is a link to the login page</Link> </li>
                            <li> <Link to="/register">this is a link to the register page</Link> </li>
                            <li> <Link to="/profile/test">this is a link to the test page</Link> </li>

                        </ul>
                    </div>
                </div>
            );
        }
    }
};

export default HomePage;