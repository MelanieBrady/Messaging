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
    // <Button style={{ float: 'left' }} variant="primary" size="sm"> My Profile </Button>
    // <Form style={{ float: 'left' }} onSubmit={this.handleUsernameSearchSubmit}>
    //     <Form.Control type="text" placeholder="Search for username..."
    //         onChange={(e) => this.setState({ usernameSearch: e.target.value })} /> </Form>
    // <Button style={{ float: 'left' }} variant="info" size="sm" type="submit">Search</Button>

    // <Button style={{ float: 'left' }} variant="secondary" size="sm" onClick={this.handlePasswordReset}> Reset Password </Button>
    // <Button style={{ float: 'left' }} variant="dark" size="sm" onClick={this.handleLogOutSubmit}> Log Out </Button>
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
                    <ul class="horizontal_TopRow">
                        <Button style={{ float: 'left' }} variant="primary" size="sm"> My Profile </Button>
                        <Button style={{ float: 'left' }} variant="info" size="sm"> Friends </Button>
                        <Button style={{ float: 'right' }} variant="dark" size="sm" onClick={this.handleLogOutSubmit} class="right"> Log Out </Button>
                        <Button style={{ float: 'right' }} variant="secondary" size="sm" onClick={this.handlePasswordReset} class="right"> Reset Password </Button>
                    </ul>
                    <ul class="horizontal_SecondRow">
                        <Form style={{ 'vertical-align': 'middle' }} size="sm" onSubmit={this.handleUsernameSearchSubmit}>
                            <Form.Control type="text" placeholder="Search for username..."
                                onChange={(e) => this.setState({ usernameSearch: e.target.value })} /> </Form>
                        <Button style={{ 'vertical-align': 'middle' }} variant="warning" size="sm" type="submit">Search</Button>
                    </ul>
                </div>
            );

        } else {
            return (
                <div>
                    <ul class="horizontal_TopRow">
                        <li> <Link to="/login">Login</Link> </li>
                        <li> <Link to="/register">Register</Link> </li>
                    </ul>
                </div>
            );
        }
    }
};

export default HomePage;