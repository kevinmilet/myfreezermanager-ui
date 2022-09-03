import React from 'react';
import {Link} from "react-router-dom";
import '../styles/Login.scss';

const Login = () => {

    const onSubmit = (event) => {
        // TODO
        event.preventDefault();
        console.log('submit');
    }

    const handleChange = (event) => {
        // TODO
        console.log('change');
        /*let currentState = {...bookData};
        currentState[event.target.name] = event.target.value;
        setBookData(currentState);*/
    }

    return (
        <>
            <div>
                <div>
                <div>
                    <h1>Bienvenue sur My Freezer Manager!</h1>
                </div>
                    <div>
                        {/*<img src={logo} alt="Logo" />*/}
                    </div>
                    <div>
                        <form>

                            <div>
                                <label><b>Email</b></label>
                                <input type="email" name="email"/>
                            </div>
                            <div>
                                <label><b>Mot de passe</b></label>
                                <input type="password" name="password"/>
                            </div>
                            <input type="submit" value="Connexion" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
