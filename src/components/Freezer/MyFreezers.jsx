import React, {useEffect, useState} from 'react';
import axios from "axios";
import FreezerCard from "./FreezerCard";
import {Row, Spinner} from "react-bootstrap";
import styled from "styled-components";
import AddFreezer from "./AddFreezer";

const Title = styled.div`
    margin: 15px 0;
    text-align: center; 
`
const FreezersContainer = styled.div`
    margin: 50px 20px;
    padding: 10px;
`

const Container = styled.div`
    margin: 15px;
    background: #FFF;
    border-radius: 1px;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2),0 4px 20px 0 rgba(0,0,0,0.19);
`

const MyFreezers = () => {
    const [typesCongelateur, setTypesCongelateur] = useState([]);
    const [myFreezers, setMyFreezers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFreezers = () => {
        axios.get('/mes_congelateurs').then(res => {
            setMyFreezers(res.data);
        })
    }

    const fetchFreezerTypes = () => {
        axios.get('/types_congelateur').then(res => {
            setTypesCongelateur(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchFreezers();
        fetchFreezerTypes();
        setLoading(false);
    }, []);

    return (
        <>
            {loading ? (
                    <div className="background-spinner">
                        <div className="spinner">
                            <Spinner animation="grow" variant="light"/>
                        </div>
                    </div>
                ) :

                <>
                    <Title>
                        <h1>Mes Congélateurs</h1>
                    </Title>

                    <Container>
                        <FreezersContainer>
                            <Row sm={12} md={6} lg={4} className="g-4">
                                {myFreezers.length === 0 ? "Vous n'avez créer aucun congélateur" :
                                    myFreezers.map((freezer, key) => (
                                        <div className="mybook-container" key={key}>
                                            <FreezerCard freezer={freezer} nom={freezer.nom}/>
                                        </div>
                                    ))}
                            </Row>
                            <div className="add-freezer-container">
                                <AddFreezer typesCongelateur={typesCongelateur} myFreezer={myFreezers}/>
                            </div>
                        </FreezersContainer>
                    </Container>
                </>
            }
        </>
    );
};

export default MyFreezers;
