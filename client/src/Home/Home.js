import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Home.css';


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            newPassword: "",
            userViewsOwnProfile: false,
            usernameSearch: "",
            usernameSearchSubmitted: false,
            loggedIn: true,
            clickedChangePassword: false,
        }
    }

    // componentDidMount() {
    //     const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    //     console.log(loggedIn);
    //     if (loggedIn) {
    //         this.setState({ loggedIn: true });
    //     }
    // }

    // Allows for users to log out!
    handleLogOutSubmit = () => {
        this.setState({ loggedIn: false });
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('token', null);
        localStorage.setItem('username', null);
    }

    handleMyProfile = () => {
        this.setState({ userViewsOwnProfile: true });
    }

    handleUsernameSearchSubmit = () => {
        console.log(this.state.usernameSearch);
        this.setState({ usernameSearchSubmitted: true });
    }

    // Allows for the user to reset password
    handlePasswordChange = () => {
        this.setState({ clickedChangePassword: true });
    }

    render() {
        if (this.state.clickedChangePassword) {
            return (
                <Redirect to={'/change'} />
            );
        }
        if (!this.state.loggedIn) {
            return (
                <Redirect to={`/login`} />
            );
        } else if (this.state.usernameSearchSubmitted) {
            return (
                <Redirect to={`/profile/${this.state.usernameSearch}`} />
            );
        } else if (this.state.userViewsOwnProfile) {
            return (
                <Redirect to={`/profile/${localStorage.getItem('username')}`} />
            );
        } else {
            return (
                <div>
                    <ul className="horizontal_TopRow">
                        <div className="smallLogo">
                            <img alt="minimum" src="https://i.redd.it/8fhjxz0ena261.jpg" />
                        </div>
                        <Button style={{ float: 'left' }} variant="primary" size="sm" onClick={this.handleMyProfile}> My Profile </Button>
                        <Button style={{ float: 'right' }} variant="dark" size="sm" onClick={this.handleLogOutSubmit}> Log Out </Button>
                        <Button style={{ float: 'right' }} variant="secondary" size="sm" onClick={this.handlePasswordReset} > Reset Password </Button>
                    </ul>
                    <ul className="horizontal_SecondRow">
                        <Form style={{ float: 'left' }} size="sm" onSubmit={this.handleUsernameSearchSubmit}>
                            <Form.Control type="text" placeholder="Search for user..."
                                onChange={(e) => this.setState({ usernameSearch: e.target.value })} /> </Form>
                        <Button style={{ float: 'left', 'backgroundColor': 'black', 'textColor': 'white' }} size="sm" type="submit">Search</Button>
                    </ul>
                </div>
            );
        }

    }

};

export default Home;