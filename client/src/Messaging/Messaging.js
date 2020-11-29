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
                <ul class="horizontal_TopRow">
                    <div className="smallLogo">
                        <img src="https://lh3.googleusercontent.com/hMjdvzKdf3jyhja4M7APZdeBv5PMXE9TgEY7cdGcmHvNj82x4594wKoTED-8fyXsH5oVnwTemRi1-2DBNA4WkxsSgbxEn8ctT7cXzcc67kKjdbscB4uPT9yG5MjOhrph_xHCGUoHh3bucMc_ueEaQMsavazPpg4x6b9ta7G8oevNcvoh4-6sMH7PjOtdN6G0Ed2UdP7gQOjs3FvG1CHLUlPJiZlno9Fpcqteg1Jfe_4YgxW5TSlgtYHEZrpV1j-JFFYg4-6H2_7UYXzzXKUD8sTvq8cbTygZKJYr_rTGrxKTDArldkjk-VrI0DVfZqKY7zJO4s7ZfNqeKZSQuEv29ih7s8HCHD_Q_od7DZheisutKlmIdrVQmlr2o51s6yIqmDwetMbcr1pkUTZwZU13CfrUVbGrEoPZmC4gY4W6M1cWl2LhGt_St9Hewkr860A_SJS7RTJp0P-p7YANHXDWy9StbQfLLHaqQFJgXzBNCJ7sw7vUsfGXFGoIfzvhO3cdaAb8pCrtUYvibgw9SVF5yR6B6GXUiBJ-BTrpN6CzLZrXr-MAxesPhXj5hUJ9B4pK0f2DDOc8ys_Ktx6dESVpSMQP0P6Wv0o0tQ2T_66YKRQxWpSoxoP7Dj7Bri5eZIBGsSBE3ajfXA0YkgiQpxQwa6mozZBquoxnUNXvdjDbH6NbJF2-QUknTz0fnYNLUw=w1015-h375-no?authuser=0" />
                    </div>
                    <Button style={{ float: 'left' }} variant="primary" size="sm" onClick={this.handleMyProfile}> My Profile </Button>
                    <Button style={{ float: 'right' }} variant="dark" size="sm" onClick={this.handleLogOutSubmit} class="right"> Log Out </Button>
                    <Button style={{ float: 'right' }} variant="secondary" size="sm" onClick={this.handlePasswordReset} class="right"> Reset Password </Button>
                </ul>
                <ul class="horizontal_SecondRow">
                    <Form style={{ float: 'left' }} size="sm" onSubmit={this.handleUsernameSearchSubmit}>
                        <Form.Control type="text" placeholder="Search for username..."
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