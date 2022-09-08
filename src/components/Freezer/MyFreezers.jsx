import React, {useEffect, useState} from 'react';
import axios from "axios";
import FreezerCard from "./FreezerCard";
import {Link} from "react-router-dom";
import {Row} from "react-bootstrap";
import styled from "styled-components";

const Title = styled.div `
    margin: 15px 0;
    text-align: center; 
`
const FreezersContainer = styled.div`
    margin: 50px 20px;
    padding: 10px;
`

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
        <>
            <Title>
                <h1>Mes Congélateurs</h1>
            </Title>
            <FreezersContainer>
                <Row sm={12} md={6} lg={4} className="g-4">
                    {myFreezers.length === 0 ? "Vous n'avez créer aucun congélateur" :
                        myFreezers.map((freezer, key) => (
                            <div className="mybook-container" key={key}>
                                <FreezerCard freezer={freezer} nom={freezer.nom}/>
                                {/*<div className="container-buttons">
                            <Link to={''}>
                                <button className="btn btn-primary btn-sm">Modifier</button>
                            </Link>
                            <button className="btn btn-primary btn-sm">Supprimer</button>
                        </div>*/}
                            </div>
                        ))}
                </Row>
            </FreezersContainer>
            <Link to=''>
                <button className="btn btn-primary btn-sm">Nouveau Congélateur</button>
            </Link>
        </>
    );
};

export default MyFreezers;
