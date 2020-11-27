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
        }
    }
    handleUsernameSearchSubmit = (event) => {
        console.log(this.state.usernameSearch);
        this.setState({ usernameSearchSubmitted: true });
    }

    render() {
        if (localStorage.getItem('loggedIn')) {

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
                    </Form>
                </div>
            );
        }
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
};

export default HomePage;