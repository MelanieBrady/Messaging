import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import "./ProfilePage.css";


export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            createdAt: '',
            friendsList: [],
            clickedFavoritesButton: false,
            clickedMessageButton: false,
            loggedIn: true,
            usernameSearch: "",
            usernameSearchSubmitted: false,
            userViewsOwnProfile: false,
            profileInfoFetched: false,
            clickedChangePassword: false,
        };
    }

    componentDidMount() {
        if (!this.state.profileInfoFetched) {
            this.fetchProfile();
        }
    }

    fetchProfile = () => {
        const username = this.props.match.params.username;
        console.log(username);
        console.log(localStorage.getItem('token'));


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

            const curUser = localStorage.getItem('username');

            if (this.state.friendsList.includes(curUser)) {
                this.setState({ weAreFriendsWithThisUser: true });
            }


        }).catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 404) {
                alert('User was not found! :(');
            } else if (error.response && error.response.status === 403) {
                this.setState({ loggedIn: false });
                localStorage.setItem('loggedIn', false);
                localStorage.setItem('token', null);
                localStorage.setItem('username', null);
            }
        });

        this.setState({ profileInfoFetched: true });
    }



    // Allows for users to log out!
    handleLogOutSubmit = () => {
        this.setState({ loggedIn: false });
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('token', null);
        localStorage.setItem('username', null);
    }

    // Allows for the user to reset password
    handlePasswordChange = () => {
        this.setState({ clickedChangePassword: true });
    }

    handleMyProfile = () => {
        this.setState({ userViewsOwnProfile: true });
    }

    handleUsernameSearchSubmit = () => {
        console.log(this.state.usernameSearch);
        this.setState({ usernameSearchSubmitted: true });
    }

    handleMessageButtonClick = () => {
        console.log(this.state.usernameSearch);
        this.setState({ clickedMessageButton: true });
    }

    handleFavoriteButtonClick = () => {
        this.setState({ clickedFavoritesButton: true });

        axios.patch('http://3.135.218.245:3001/favorites/add/' + localStorage.getItem('username'), {
            data: {
                usernameToAdd: this.state.username,
            }
        }, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const name = this.state.firstName + " " + this.state.lastName;
        if (this.state.clickedFavoritesButton) {
        }

        if (this.state.clickedChangePassword) {
            return (
                <Redirect to={'/change'} />
            );
        } else if (this.state.clickedMessageButton) {
            return (
                <Redirect to={'/messaging/' + this.state.username} />
            );
        } else if (this.state.usernameSearchSubmitted) {
            return (
                <Redirect to={`/profile/${this.state.usernameSearch}`} />
            );
        } else if (this.state.userViewsOwnProfile) {
            return (
                <Redirect to={`/home`} />
            );
        } else if (!this.state.loggedIn) {
            return (
                <Redirect to={'/login/'} />
            );
        }

        return (
            <div>
                <ul className="horizontal_TopRow">
                    <div className="smallLogo">
                        <img alt="minimum" src="https://i.redd.it/8fhjxz0ena261.jpg" />
                    </div>
                    <Button style={{ float: 'left' }} type="button" variant="primary" size="sm" onClick={this.handleMyProfile}>Home</Button>
                    <Button style={{ float: 'right' }} type="button" variant="dark" size="sm" onClick={this.handleLogOutSubmit}> Log Out </Button>
                    <Button style={{ float: 'right' }} type="button" variant="secondary" size="sm" onClick={this.handlePasswordReset}> Reset Password </Button>
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
                                        <Button block size="sm" type="button" style={{ display: 'inlineBlock' }} onClick={this.handleFavoriteButtonClick}> Favorite </Button>
                                        <Button block size="sm" type="button" variant="outlinePrimary" style={{ display: 'inlineBlock' }} onClick={this.handleMessageButtonClick}> Message </Button>
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