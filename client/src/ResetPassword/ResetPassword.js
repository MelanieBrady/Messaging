import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import "./ResetPassword.css";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            newPassword: '',
            passwordUpdate: false,
        };
    }

    validateForm = () => {
        return this.state.username.length > 0 && this.state.password.length > 0 && this.state.newPassword.length > 0;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.username + ' ' + this.state.password + ' ' + this.state.newPassword);

        axios.post('http://3.135.218.245:3001/reset', {
            username: localStorage.getItem('username'),
            password: this.state.password,

        }).then((res) => {
            console.log(res);
            this.setState({ passwordUpdate: true });
        });

        if (this.state.passwordUpdate) {
            this.setState({ loggedIn: false });
            localStorage.setItem('loggedIn', false);
            localStorage.setItem('token', null);
            localStorage.setItem('username', null);
        }
    }

    render() {
        // Update password ask them to sign in again?
        if (this.state.passwordUpdate) {

            return (
                <Redirect to='login' />
            );
        }

        return (
            <div>
                <div className="logo_container">
                    <img alt="logo" src="https://i.redd.it/8fhjxz0ena261.jpg" />
                </div>
                <div className="Reset">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={this.state.newPassword}
                                onChange={(e) => this.setState({ newPassword: e.target.value })}
                            />
                        </Form.Group>
                        <Button block size="lg" type="submit" disabled={!this.validateForm()}>Update Password</Button>
                    </Form>
                </div>
            </div>
        );
    }
}