import React from 'react';
import '../styles/Navbar.scss';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/mes_congelateurs">Mes Congélateurs</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mes_produits">Mes Produits</Link>
                    </li>
                </ul>
                <div className="d-flex text-end">
                   {/* {
                        userInfos ?*/}
                            <>
                                <div>
                                    Bienvenue, XXX
                                </div>
                                <button className="btn btn-secondary btn-sm mx-2" >
                                    Se déconnecter
                               </button>
                           </>
                            {/*  : null
                    }*/}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
