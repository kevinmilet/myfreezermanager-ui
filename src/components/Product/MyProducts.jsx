import React, {useEffect, useState} from 'react';
import axios from "axios";

const MyProducts = () => {
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        axios.get('/mes_produits').then(response => {
            setMyProducts(response.data);
        })
    }, []);


        console.log(myProducts);
    return (
        <div>
            Mes produits
        </div>
    );
};

export default MyProducts;
