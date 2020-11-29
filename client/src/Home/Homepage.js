import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <div class="logo_container">
                    <img alt="logo" src="https://lh3.googleusercontent.com/hMjdvzKdf3jyhja4M7APZdeBv5PMXE9TgEY7cdGcmHvNj82x4594wKoTED-8fyXsH5oVnwTemRi1-2DBNA4WkxsSgbxEn8ctT7cXzcc67kKjdbscB4uPT9yG5MjOhrph_xHCGUoHh3bucMc_ueEaQMsavazPpg4x6b9ta7G8oevNcvoh4-6sMH7PjOtdN6G0Ed2UdP7gQOjs3FvG1CHLUlPJiZlno9Fpcqteg1Jfe_4YgxW5TSlgtYHEZrpV1j-JFFYg4-6H2_7UYXzzXKUD8sTvq8cbTygZKJYr_rTGrxKTDArldkjk-VrI0DVfZqKY7zJO4s7ZfNqeKZSQuEv29ih7s8HCHD_Q_od7DZheisutKlmIdrVQmlr2o51s6yIqmDwetMbcr1pkUTZwZU13CfrUVbGrEoPZmC4gY4W6M1cWl2LhGt_St9Hewkr860A_SJS7RTJp0P-p7YANHXDWy9StbQfLLHaqQFJgXzBNCJ7sw7vUsfGXFGoIfzvhO3cdaAb8pCrtUYvibgw9SVF5yR6B6GXUiBJ-BTrpN6CzLZrXr-MAxesPhXj5hUJ9B4pK0f2DDOc8ys_Ktx6dESVpSMQP0P6Wv0o0tQ2T_66YKRQxWpSoxoP7Dj7Bri5eZIBGsSBE3ajfXA0YkgiQpxQwa6mozZBquoxnUNXvdjDbH6NbJF2-QUknTz0fnYNLUw=w1015-h375-no?authuser=0" />
                </div>
                <ul class="horizontal_TopRow_LoggedOut">
                    <li class="horizontal_TopRow_LoggedOut"> <Link to="/login">Login</Link> </li>
                    <li class="horizontal_TopRow_LoggedOut"> <Link to="/register">Register</Link> </li>
                </ul>
            </div>
        );
    }

};

export default HomePage;