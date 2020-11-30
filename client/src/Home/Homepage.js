import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <div className="logo_container">
                    <img alt="minimum" src="https://i.redd.it/8fhjxz0ena261.jpg" />
                </div>
                <ul className="horizontal_TopRow_LoggedOut">
                    <li className="horizontal_TopRow_LoggedOut"> <Link to="/login">Login</Link> </li>
                    <li className="horizontal_TopRow_LoggedOut"> <Link to="/register">Register</Link> </li>
                </ul>
            </div>
        );
    }

};

export default HomePage;