import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AUTH_TOKEN_KEY} from "../../App";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from "prop-types";

const SignUp = () => {
    const history = useNavigate();

    const validationSchema = Yup.object().shape({
        nom: Yup.string().required('Le nom est requis').matches(/^[a-zA-Z-'\s]+$/, 'Ne peut contenir que des lettres, des espaces et des tirets'),
        prenom: Yup.string().required('Le prénom est requis').matches(/^[a-zA-Z-'\s]+$/, 'Ne peut contenir que des lettres, des espaces et des tirets'),
        email: Yup.string().required('L\'email est requis').email('L\'email est invalide'),
        password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),
        password_conf: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas').required('La confirmation est requise')
    }).required();

    const {register, handleSubmit, formState} = useForm({
        defaultValues: {
            nom: '',
            prenom: '',
            email: '',
            password: '',
            password_conf: ''
        },
        resolver: yupResolver(validationSchema)
    });

    const {errors} = formState;

    const onSubmit = (data) => {
        console.log(data);
        axios.post('/creer_utilisateur', {
            ...data
        }).then(response => {
            const bearerToken = response?.headers?.authorization;
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken.slice(7, bearerToken.length);
                sessionStorage.setItem(AUTH_TOKEN_KEY, jwt);
            }
            history('/login');
        });
    }

    return (
        <div>
            <div className="text-center mt-3">
                <h1>Bienvenue sur My Freezer Manager</h1>
            </div>

            <div className="card m-auto px-4 col-12 col-sm-10 col-lg-3 mt-5" style={{width: '500px'}}>
                <div className="card-body">
                    <div className="text-center mb-3">
                        <h3>M'inscrire</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="nom">Nom</label>
                                <input type="text"
                                       className="form-control"
                                       id="nom"
                                       name="nom"
                                       {...register('nom')}
                                />
                            </div>
                            <div className="error-msg">{errors.nom?.message}</div>
                            <div className="col">
                                <label htmlFor="prenom">Prénom</label>
                                <input type="text"
                                       className="form-control"
                                       id="prenom"
                                       name="prenom"
                                       {...register('prenom')}
                                />
                                <div className="error-msg">{errors.prenom?.message}</div>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="email">Adresse Email</label>
                            <input type="email"
                                   className="form-control"
                                   id="email"
                                   name="email"
                                   {...register('email')}
                            />
                            <div className="error-msg">{errors.email?.message}</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">

                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input type="password"
                                           className="form-control"
                                           id="password"
                                           name="password"
                                           {...register('password')}
                                    />
                                    <div className="error-msg">{errors.password?.message}</div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="password_conf">Confirmation</label>
                                    <input type="password"
                                           className="form-control"
                                           id="password_conf"
                                           name="password_conf"
                                           {...register('password_conf')}
                                    />
                                    <div className="error-msg">{errors.password_conf?.message}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-end">
                            <button type="submit" className="btn btn-primary">Envoyer</button>
                        </div>
                    </form>
                    <div className="row mt-3">
                        <div className="col text-start">
                            <Link to="/login">Déjà un compte?</Link>
                        </div>
                        <div className="col text-end">
                            <Link to="/forgot_password">Mot de passe oublié</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SignUp.propTypes = {
    nom: PropTypes.string.isRequired,
    prenom: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password_conf: PropTypes.string.isRequired
};

SignUp.defaultProps = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    password_conf: ''
}

export default SignUp;
