import React from 'react';
import '../styles/Navbar.scss';
import {Link, useNavigate} from "react-router-dom";
import {AUTH_TOKEN_KEY} from "../App";

const Navbar = ({userInfos, setUserInfos}) => {

    const history = useNavigate();

    const signOut = () => {
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        setUserInfos(null);
        history('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav mr-auto me-auto">
                    <Link className="nav-link" to="/mes_congelateurs">Mes Congélateurs</Link>
                    <Link className="nav-link" to="/mes_produits">Mes Produits</Link>
                </div>
                <div className="navbar-nav d-flex align-items-center">
                    <button className="btn btn-primary btn-sm mx-2">
                        Mon compte
                    </button>
                    <button className="btn btn-secondary btn-sm mx-2" onClick={signOut}>
                        Se déconnecter
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
