import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const FreezerDetails = () => {
    const param = useParams();
    const [freezerData, setFreezerData] = useState([]);

    useEffect(() => {
        axios.get(`/congelateur/${param.freezerId}`).then(response => {
                setFreezerData(response.data);
        })
    }, [param.freezerId]);

    console.log(freezerData);

    return (
        <div>
            Feezer Details {freezerData.nom}
        </div>
    );
};

export default FreezerDetails;
