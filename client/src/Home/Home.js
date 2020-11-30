import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './Home.css';


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            createdAt: '',
            friendsList: [],
            password: "",
            userViewsOwnProfile: false,
            usernameSearch: "",
            usernameSearchSubmitted: false,
            loggedIn: true,
            clickedMessageButton: false,
            clickedChangePassword: false,
        }
    }

    componentDidMount() {
        const username = localStorage.getItem('username');
        axios.get('http://3.135.218.245:3001/profile/' + username, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((res) => {
            const user = res.data.user;
            this.setState({ firstName: user.firstName });
            this.setState({ lastName: user.lastName });
            this.setState({ username: user.username });
            this.setState({ createdAt: user.createdAt });
            this.setState({ friendsList: user.friendsList });
        }).catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 404) {
                alert('User was not found! :(');
            }
        });
    }

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

    handleMessageButtonClick = () => {
        console.log(this.state.usernameSearch);
        this.setState({ clickedMessageButton: true });
    }

    render() {
        const name = this.state.firstName + " " + this.state.lastName;

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
        } else if (this.state.clickedMessageButton) {
            return (
                <Redirect to={'/messaging/' + this.state.username} />
            );
        } else {
            return (
                <div>
                    <ul className="horizontal_TopRow">
                        <div className="smallLogo">
                            <img alt="minimum" src="https://i.redd.it/8fhjxz0ena261.jpg" />
                        </div>
                        <Button style={{ float: 'left' }} type="button" variant="primary" size="sm" onClick={this.handleMyProfile}>Home</Button>
                        <Button style={{ float: 'right' }} variant="dark" size="sm" onClick={this.handleLogOutSubmit}> Log Out </Button>
                        <Button style={{ float: 'right' }} variant="secondary" size="sm" onClick={this.handlePasswordChange} class="right"> Change Password </Button>
                    </ul>
                    <ul className="horizontal_SecondRow">
                        <Form style={{ float: 'left' }} size="sm" onSubmit={this.handleUsernameSearchSubmit}>
                            <Form.Control type="text" placeholder="Search for user..."
                                onChange={(e) => this.setState({ usernameSearch: e.target.value })} /> </Form>
                        <Button style={{ float: 'left', 'backgroundColor': 'black', 'textColor': 'white' }} size="sm" type="submit">Search</Button>
                    </ul>
                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <img src="https://comotion.uw.edu/wp-content/uploads/2019/05/generic-profile.png" alt="Admin" width="150" />
                                        <div class="mt-3">
                                            <h4> {name} </h4>
                                            <h6> {this.state.username} </h6>
                                            <Button block size="sm" type="button" variant="primary" style={{ display: 'inlineBlock' }} onClick={this.handleMessageButtonClick}>Talk with yourself</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            );
        }

    }

};

export default Home;