import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {AUTH_TOKEN_KEY} from "../App";

const SignUp = () => {
    const [userData, setUserData] = useState({});

    const handleChange = (event) => {
        let currentState = {...userData};
        currentState[event.target.name] = event.target.value;
        setUserData(currentState);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(userData);
        axios.post('/utilisateur', {
            ...userData
        }).then(response => {
            const bearerToken = response?.headers?.authorization;
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken.slice(7, bearerToken.length);
                sessionStorage.setItem(AUTH_TOKEN_KEY, jwt);
            }
        })
    }

    return (
        <div>
            <div className="text-center mt-3">
                <h1>Bienvenue sur My Freezer Manager</h1>
            </div>

            <div className="card m-auto px-4 col-12 col-sm-10 col-lg-3 mt-5">
                <div className="card-body">
                    <div className="text-center mb-3">
                        <h3>M'inscrire</h3>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="nom">Nom</label>
                                <input type="text" className="form-control" id="nom" name="nom"
                                       onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label htmlFor="prenom">Prénom</label>
                                <input type="text" className="form-control" id="prenom" name="prenom"
                                       onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="email">Adresse Email</label>
                            <input type="email" className="form-control" id="email" name="email"
                                   onChange={handleChange}/>
                        </div>
                        <div className="row mt-2">
                            <div className="col">

                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input type="password" className="form-control" id="password" name="password"
                                           onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="password_conf">Confirmation</label>
                                    <input type="password" className="form-control" id="password_conf"
                                           name="password_conf" onChange={handleChange}/>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-end">
                            <button type="submit" className="btn btn-primary">Envoyer</button>
                        </div>
                    </form>
                    <div className="row mt-3">
                        <div className="col text-start">
                            <Link to="/login">Déjà un compte?</Link>
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

export default SignUp;
