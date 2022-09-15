import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import ProductTable from "../Product/ProductTable";
import {Spinner} from "react-bootstrap";

const FreezerDetails = () => {
    const param = useParams();
    const [freezerData, setFreezerData] = useState([]);

    useEffect(() => {
        axios.get(`/congelateur/${param.freezerId}`).then(response => {
            setFreezerData(response.data);
        })
    }, [param.freezerId]);

    return (
        <div>
            <h2>Contenu de {freezerData.nom}</h2>
            <ProductTable/>
        </div>

    );
};

export default FreezerDetails;
