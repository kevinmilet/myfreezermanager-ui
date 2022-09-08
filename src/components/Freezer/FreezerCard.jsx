import React from 'react';
import {Card, Col} from "react-bootstrap";
import freezer_img from '../../assets/img/freezer.png';
import styled from "styled-components";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import FreezerDetails from "./FreezerDetails";

const ImgContainer = styled.div`
    width: 50%;
    padding: 20px 5px 0 5px;
    margin: 0 auto
`

const FreezerCard = ({freezer}) => {

    const capitalize = (str) => {
        return (str + '').charAt(0).toUpperCase() + str.substring(1);
    }

    return (
        <Col className="freezer">
            <Link to={`/congelateur/${freezer.id}`}>
                <Card style={{width: '18rem'}} className="shadow-sm text-center">
                    <ImgContainer>
                        <Card.Img variant="top" src={freezer_img}/>
                    </ImgContainer>
                    <Card.Body>
                            {capitalize(freezer.nom)}
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

FreezerCard.propTypes = {
    nom: PropTypes.string.isRequired,
}

FreezerDetails.defaultProps = {
    nom: '',
}

export default FreezerCard;

