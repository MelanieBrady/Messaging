import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Redirect } from 'react-router-dom';

import "./Register.css";

import axios from 'axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            registered: false,
        };
    }

    validateForm = () => {
        return this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.username.length > 0 && this.state.password.length > 0 && this.state.email.length > 0;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log(this.state.firstName + ' ' + this.state.lastName + ' ' + this.state.username + ' ' + this.state.password + ' ' + this.state.email);

        axios.post('http://3.135.218.245:3001/register', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,

        }).then((res) => {

            console.log(res);
            this.setState({ registered: true });

        });
    }

    render() {
        if (this.state.registered) {
            return (
                <Redirect to='login' />
            );
        }

        return (
            <div>
                <div className="logo_container">
                    <img alt="logo" src="https://lh3.googleusercontent.com/hMjdvzKdf3jyhja4M7APZdeBv5PMXE9TgEY7cdGcmHvNj82x4594wKoTED-8fyXsH5oVnwTemRi1-2DBNA4WkxsSgbxEn8ctT7cXzcc67kKjdbscB4uPT9yG5MjOhrph_xHCGUoHh3bucMc_ueEaQMsavazPpg4x6b9ta7G8oevNcvoh4-6sMH7PjOtdN6G0Ed2UdP7gQOjs3FvG1CHLUlPJiZlno9Fpcqteg1Jfe_4YgxW5TSlgtYHEZrpV1j-JFFYg4-6H2_7UYXzzXKUD8sTvq8cbTygZKJYr_rTGrxKTDArldkjk-VrI0DVfZqKY7zJO4s7ZfNqeKZSQuEv29ih7s8HCHD_Q_od7DZheisutKlmIdrVQmlr2o51s6yIqmDwetMbcr1pkUTZwZU13CfrUVbGrEoPZmC4gY4W6M1cWl2LhGt_St9Hewkr860A_SJS7RTJp0P-p7YANHXDWy9StbQfLLHaqQFJgXzBNCJ7sw7vUsfGXFGoIfzvhO3cdaAb8pCrtUYvibgw9SVF5yR6B6GXUiBJ-BTrpN6CzLZrXr-MAxesPhXj5hUJ9B4pK0f2DDOc8ys_Ktx6dESVpSMQP0P6Wv0o0tQ2T_66YKRQxWpSoxoP7Dj7Bri5eZIBGsSBE3ajfXA0YkgiQpxQwa6mozZBquoxnUNXvdjDbH6NbJF2-QUknTz0fnYNLUw=w1015-h375-no?authuser=0" />
                </div>

                <div className="Register">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group size="lg" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                autoFocus
                                value={this.state.firstName}
                                type="firstName"
                                onChange={(e) => this.setState({ firstName: e.target.value })}
                            /> </Form.Group>
                        <Form.Group size="lg" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                autoFocus
                                value={this.state.lastName}
                                type="lastName"
                                onChange={(e) => this.setState({ lastName: e.target.value })}
                            /> </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                value={this.state.email}
                                type="email"
                                onChange={(e) => this.setState({ email: e.target.value })}
                            /> </Form.Group>
                        <Form.Group size="lg" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                            /> </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            /> </Form.Group>
                        <Button block size="lg" type="submit" disabled={!this.validateForm()}> Register</Button>
                    </Form>
                </div>
            </div>
        );
    }
}