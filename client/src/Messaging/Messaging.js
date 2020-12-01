import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import BottomBar from './BottomBar';
import io from 'socket.io-client';
import axios from 'axios';
import './Messaging.css';

class Messaging extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: [],
            content: '',
            from: '',
            to: '',
            chatRoomName: '',
            usernameSearch: "",
            usernameSearchSubmitted: false,
            loggedIn: true,
            userViewsOwnProfile: false,
            clickedChangePassword: false,
        };
    }

    createChatRoomName(to, from) {
        const names = [to, from];
        names.sort();
        console.log(names);
        return names[0] + names[1];
    }

    componentDidMount() {
        const to = this.props.match.params.username;
        const from = localStorage.getItem('username');
        const chatRoomName = this.createChatRoomName(to, from);

        this.setState({ to });
        this.setState({ from });
        this.setState({ chatRoomName });

        //        this.socket = io(config[process.env.NODE_ENV].endpoint);
        this.socket = io('http://3.135.218.245:5000');

        this.socket.emit('join', { chatRoomName }, (msg) => {
            console.log(msg);
            let msgReversed = msg.reverse();
            console.log(msgReversed);
            this.setState((state) => ({
                chat: [...state.chat, ...msgReversed],
            }), this.scrollToBottom);
        });

        // Update the chat if a new message is broadcasted.
        this.socket.on('push', (msg) => {
            this.setState((state) => ({
                chat: [...state.chat, msg],
            }), this.scrollToBottom);
        });
    }

    // Save the message the user is typing in the input field.
    handleContent(event) {
        this.setState({
            content: event.target.value,
        });
    }

    //
    handleName(event) {
        this.setState({
            name: event.target.value,
        });
    }

    handleSubmit(event) {
        // Prevent the form to reload the current page.
        event.preventDefault();

        // Send the new message to the server.
        this.socket.emit('message', {
            from: this.state.from,
            content: this.state.content,
            to: this.state.to,
            chatRoomName: this.state.chatRoomName,
        });

        this.setState((state) => {
            // Update the chat with the user's message and remove the current message.
            return {
                chat: [...state.chat, {
                    from: state.from,
                    to: state.to,
                    content: state.content,
                }],
                content: '',
            };
        }, this.scrollToBottom);
    }


    handleUsernameSearchSubmit = (event) => {
        console.log(this.state.usernameSearch);
        this.setState({ usernameSearchSubmitted: true });
    }

    // Allows for users to log out!
    handleLogOutSubmit = (event) => {
        this.setState({ loggedIn: false });
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('token', null);
        localStorage.setItem('username', null);
    }

    // Allows for the user to reset password
    handlePasswordChange = () => {
        this.setState({ clickedChangePassword: true });
    }


    handleMyProfile = (event) => {
        this.setState({ userViewsOwnProfile: true });
    }

    // Always make sure the window is scrolled down to the last message.
    scrollToBottom() {
        const chat = document.getElementById('chat');
        chat.scrollTop = chat.scrollHeight;
    }

    render() {

        if (this.state.clickedChangePassword) {
            return (
                <Redirect to={'/change'} />
            );
        }

        if (!this.state.loggedIn || localStorage.getItem('loggedIn') === false || localStorage.getItem('username') === null) {
            return (
                <Redirect to={`/`} />
            );
        }

        // Add more to the logged in 
        if (this.state.usernameSearchSubmitted) {
            return (
                <Redirect to={`/profile/${this.state.usernameSearch}`} />
            );
        }

        if (this.state.userViewsOwnProfile) {
            return (
                <Redirect to={`/home`} />
            );
        }

        return (
            <div className="App" >
                <ul class="horizontal_TopRow">
                    <div className="smallLogo">
                        <img alt="minimum" src="https://i.redd.it/8fhjxz0ena261.jpg" />
                    </div>
                    <Button style={{ float: 'left' }} type="button" variant="primary" size="sm" onClick={this.handleMyProfile}>Home</Button>
                    <Button style={{ float: 'right' }} variant="dark" size="sm" onClick={this.handleLogOutSubmit} class="right"> Log Out </Button>
                    <Button style={{ float: 'right' }} variant="secondary" size="sm" onClick={this.handlePasswordChange} class="right"> Change Password </Button>
                </ul>
                <ul class="horizontal_SecondRow">
                    <Form style={{ float: 'left' }} size="sm" onSubmit={this.handleUsernameSearchSubmit}>
                        <Form.Control type="text" placeholder="Search for user..."
                            onChange={(e) => this.setState({ usernameSearch: e.target.value })} /> </Form>
                    <Button style={{ float: 'left', 'background-color': 'black', 'text-color': 'white' }} size="sm" type="submit">Search</Button>
                </ul>

                <Paper id="chat" elevation={3}>
                    {this.state.chat.map((el, index) => {
                        return (
                            <div key={index}>
                                <Typography variant="caption" className="name">
                                    {el.from}
                                </Typography>
                                <Typography variant="body1" className="content">
                                    {el.content}
                                </Typography>
                            </div>
                        );
                    })}
                </Paper>
                <BottomBar
                    content={this.state.content}
                    handleContent={this.handleContent.bind(this)}
                    handleName={this.handleName.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    name={this.state.from}
                />
            </div>
        );
    }
};

export default Messaging;