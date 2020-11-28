import React from 'react';
import config from '../config';
import io from 'socket.io-client';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BottomBar from './BottomBar';
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

        this.socket = io(config[process.env.NODE_ENV].endpoint);

        this.socket.emit('join', { chatRoomName }, (msg) => {
            console.log(msg);
            let msgReversed = msg.reverse();
            console.log(msgReversed);
            this.setState((state) => ({
                chat: [...state.chat, ...msgReversed],
            }), this.scrollToBottom);
        });

        // Load the last 10 messages in the window.
        // this.socket.on('init', { chatRoomName }, (msg) => {
        //     console.log('init within client');
        //     let msgReversed = msg.reverse();
        //     console.log(msgReversed);
        //     this.setState((state) => ({
        //         chat: [...state.chat, ...msgReversed],
        //     }), this.scrollToBottom);
        // });

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

    // Always make sure the window is scrolled down to the last message.
    scrollToBottom() {
        const chat = document.getElementById('chat');
        chat.scrollTop = chat.scrollHeight;
    }

    render() {
        return (
            <div className="App" >
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