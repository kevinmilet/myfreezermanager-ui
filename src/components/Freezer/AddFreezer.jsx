import React from 'react';
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import axios from "axios";

const AddFreezer = ({typesCongelateur}) => {
    const capitalize = (str) => {
        return (str + '').charAt(0).toUpperCase() + str.substring(1);
    }

    const validationSchema = Yup.object().shape({
        nom: Yup.string().required('Le nom est requis').matches(/^[a-zA-Z0-9-'\s]+$/, 'Ne peut contenir que des caractères alphanumériques, des espaces et des tirets'),
        typeCongelateur: Yup.string().required('Le type de congélateur est requis')
    }).required();

    const {register, handleSubmit, formState} = useForm({
        defaultValues: {
            nom: '',
            typeCongelateur: ''
        },
        resolver: yupResolver(validationSchema)
    });

    const {errors} = formState;

    const onSubmit = (data) => {
        let dataToSend = {
            nom: data.nom,
            typeCongelateur: {
                id: ~~data.typeCongelateur
            }
        }

        axios.post('/congelateur/create', dataToSend).then(response => {
            console.log('Congélateur créé avec succes', response.data);
        }).catch(error => {
            console.error(error.message);
        })
    }

    return (
        <>
            <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <label className="visually-hidden" htmlFor="nom">Nom</label>
                    <input type="text"
                           className="form-control"
                           id="nom"
                           name="nom"
                           {...register('nom')}
                    />
                    <div className="error-msg">{errors.nom?.message}</div>
                </div>
                <div className="col-12">
                    <label className="visually-hidden" htmlFor="typeCongelateur">Type de congélateur</label>
                    <select
                        {...register('typeCongelateur')}
                        className="form-select"
                        id="typeCongelateur"
                        name="typeCongelateur"
                    >
                        <option value=""></option>
                        {typesCongelateur?.map(item => (
                            <option value={item.id} key={item.id}>
                                {capitalize(item.nom)}
                            </option>
                        ))
                        }
                    </select>
                    <div className="error-msg">{errors.typeCongelateur?.message}</div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary btn-sm" type="submit">Ajouter un Congélateur</button>
                </div>
            </form>
        </>
    );
};

export default AddFreezer;
