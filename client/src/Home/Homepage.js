import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

import {
    Link,
} from 'react-router-dom';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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

    handleLogOutSubmit = (event) => {
        this.setState({ loggedIn: false });
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('token', null);
        localStorage.setItem('username', null);
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button block size="sm" style={{ display: 'inline-block' }} onClick={this.handleLogOutSubmit}>
                            Log Out
                        </Button>
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