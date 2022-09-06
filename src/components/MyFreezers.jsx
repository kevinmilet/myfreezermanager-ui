import React, {useEffect, useState} from 'react';
import axios from "axios";
import Freezer from "./Freezer";
import {Link} from "react-router-dom";

const MyFreezers = () => {

    const [myFreezers, setMyFreezers] = useState([]);

    const fetchFreezers = () => {
        axios.get('/mes_congelateurs').then(res => {
            setMyFreezers(res.data);
        })
    }

    useEffect(() => {
        fetchFreezers();
    }, []);

    return (
        <div className="container">
            <h1>Mes Congélateurs</h1>
            <div className="list-container">
                {myFreezers.length === 0 ? "Vous n'avez créer aucun congélateur" : null}
                {myFreezers.map((freezer, key) => (
                    <div className="mybook-container" key={key}>
                        <Freezer freezer={freezer} />
                        <div className="container-buttons">
                            <Link to={''}>
                                <button className="btn btn-primary btn-sm">Modifier</button>
                            </Link>
                            <button className="btn btn-primary btn-sm">Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
            <Link to=''>
                <button className="btn btn-primary btn-sm">Nouveau Congélateur</button>
            </Link>
        </div>
    );
};

export default MyFreezers;
