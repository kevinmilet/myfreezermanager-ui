import React, {useState} from 'react';
import {Link} from "react-router-dom";
import '../styles/Login.scss';

const Login = () => {

    const [userData, setUserData] = useState({});

    const onSubmit = (event) => {
        // TODO
        event.preventDefault();
        console.log(userData);
    }

    const handleChange = (event) => {
        // TODO
        let currentState = {...userData};
        currentState[event.target.name] = event.target.value;
        setUserData(currentState);
    }

    return (
        <div>
            <div className="text-center mt-3">
                <h1>Bievenue sur My Freezer Manager</h1>
            </div>

            <div className="card m-auto px-4 col-12 col-sm-10 col-lg-3 mt-5">
                <div className="card-body">
                    <div className="text-center">
                        <h3>Me connecter</h3>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Adresse Email</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={handleChange}/>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={handleChange}/>
                        </div>
                        {/*<div className="form-check mt-2">
                            <input type="checkbox" className="form-check-input" name="remember_me" id="remember-me" onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="remember-me">Se souvenir de moi</label>
                        </div>*/}
                        <div className="mt-3 text-end">
                            <button type="submit" className="btn btn-primary">Connexion</button>
                        </div>
                    </form>
                    <div className="row mt-3">
                        <div className="col text-start">
                            <Link to="/signup">Pas encore de compte?</Link>
                        </div>
                        <div className="col text-end">
                            <Link to="/forgot_password">Mot de passe oublié</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
