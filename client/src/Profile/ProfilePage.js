import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation, Redirect } from 'react-router-dom';
import axios from 'axios';

import {
    Link,
} from 'react-router-dom';

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
        };
    }

    componentDidMount() {
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
            }
        });
    }

    handleMessageButtonClick = (event) => {
        console.log(this.state.usernameSearch);
        this.setState({ clickedMessageButton: true });
    }

    handleFavoriteButtonClick = (event) => {
        console.log(this.state.usernameSearch);
        this.setState({ clickedFavoritesButton: true });
    }

    render() {
        const name = this.state.firstName + " " + this.state.lastName;

        if (this.state.clickedMessageButton) {
            return (
                <Redirect to={'/messaging/' + this.state.username} />
            );
        }
        // Message friend 
        // deal with if friends or not button after profile is up

        return (
            <div>
                <nav aria-label="breadcrumb" class="main-breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active" aria-current="page"><Link to="/">Home</Link> </li>
                        <li class="breadcrumb-item active" aria-current="page">User Profile</li>
                    </ol>
                </nav>
                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src="https://comotion.uw.edu/wp-content/uploads/2019/05/generic-profile.png" alt="Admin" class="rounded-circle" width="150" />
                                    <div class="mt-3">
                                        <h4> {name} </h4>
                                        <p class="text-secondary mb-1">Full Stack Developer</p>
                                        <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                        <Button block size="sm" style={{ display: 'inline-block' }} onClick={this.handleFavoriteButtonClick}>
                                            Favorite
                                        </Button>

                                        <Button block size="sm" variant="outline-primary" style={{ display: 'inline-block' }} onClick={this.handleMessageButtonClick}>
                                            Message
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Username</h6>
                                </div>
                                <div class="col-sm-9 text-secondary"> {this.state.username} </div>
                            </div>
                            <hr />
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Phone</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    (239) 816-9029
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}