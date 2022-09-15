import React, {useEffect, useState} from 'react';
import * as PropTypes from "prop-types";
import DataTable from 'react-data-table-component';
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Spinner} from "react-bootstrap";
import Loader from "../Tools/Loader";
require('dayjs/locale/fr')

const paginationComponentOptions = {
    rowsPerPageText: 'Produits par pages',
    rangeSeparatorText: 'sur',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Toutes',
};

const ProductTable = () => {
    const localizedFormat = require('dayjs/plugin/localizedFormat');
    dayjs.extend(localizedFormat);
    const param = useParams();
    const [products, setProducts] = useState([]);
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            name: 'Nom',
            selector: row => row.nom,
            sortable: true,
        },
        {
            name: 'Quantité',
            selector: row => row.quantite,
            sortable: true,
        },
        {
            name: 'Date d\'ajout',
            selector: row => dayjs(row.dateAjout).locale("fr").format("DD MMMM YYYY"),
            sortable: true,
        },
        {
            name: 'Type de produit',
            selector: row => row.typeProduit.nom,
            sortable: true,
        },
    ];

    const handleChange = ({selectedRows}) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', selectedRows);
        setSelectedRows(selectedRows);
    };

    const handleClick = (row) => {
        console.log('Selected Row id: ', row);
    }

    useEffect(() => {
        axios.get(`/mes_produits/congelateur/${param.freezerId}`).then(response => {
            setProducts(response.data);
        }).finally(() => {
                setLoading(false);
            }
        )
    }, [param.freezerId]);


    return (
        <>
            {
                loading ? (
                        <div className="background-spinner">
                            <div className="spinner">
                                <Loader/>
                            </div>
                        </div>
                    ) :
                    <div>
                        {
                            products.length === 0 ? "Vous n'avez aucun produits dans ce congélateur" :
                                <DataTable
                                    columns={columns}
                                    data={products}
                                    selectableRows
                                    onSelectedRowsChange={handleChange}
                                    pagination
                                    paginationPerPage={5}
                                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    paginationComponentOptions={paginationComponentOptions}
                                    onRowClicked={(row) => handleClick(row)}
                                    noDataComponent="Pas de produits dans ce congélateur"
                                />
                        }
                    </div>
            }
        </>
    );
};

ProductTable.propTypes = {
    nom: PropTypes.string.isRequired,
    quantite: PropTypes.number.isRequired,
    dateAjout: PropTypes.string.isRequired,
    typeProduit: PropTypes.string.isRequired,
}

ProductTable.defaultProps = {
    nom: '',
    quantite: 0,
    dateAjout: '',
    typeProduit: '',
}

export default ProductTable;
