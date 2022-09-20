import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../../styles/Login.scss';
import axios from "axios";
import {AUTH_TOKEN_KEY} from "../../App";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = ({setUserInfos}) => {

    const history = useNavigate();
    // const [userData, setUserData] = useState({});

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('L\'email est requis').email('L\'email est invalide'),
        password: Yup.string().required('Le mot de passe est requis'),
    }).required();

    const {register, handleSubmit, formState} = useForm({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(validationSchema)
    });

    const {errors} = formState;

    const onSubmit = (data) => {
        axios.post('/authenticate', data).then(response => {
            const bearerToken = response?.headers?.authorization;
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken.slice(7, bearerToken.length);
                sessionStorage.setItem(AUTH_TOKEN_KEY, jwt);
            }
            setUserInfos(response.data.userName);
            history('/mes_congelateurs');
        })
    }

    return (
        <div>
            <div className="text-center mt-3">
                <h1>Bienvenue sur My Freezer Manager</h1>
            </div>

            <div className="card m-auto px-4 col-12 col-sm-10 col-lg-3 mt-5" style={{width: '350px'}}>
                <div className="card-body">
                    <div className="text-center">
                        <h3>Me connecter</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="email">Adresse Email</label>
                            <input type="email"
                                   className="form-control"
                                   id="email"
                                   name="email"
                                   {...register('email')}
                            />
                            <div className="error-msg">{errors.email?.message}</div>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password"
                                   className="form-control"
                                   id="password"
                                   name="password"
                                   {...register('password')}
                            />
                            <div className="error-msg">{errors.password?.message}</div>
                        </div>
                        {/*<div className="form-check mt-2">
                            <input type="checkbox" className="form-check-input" name="remember_me" id="remember-me" onChange={handleChange}/>
                            <label className="form-check-label" htmlFor="remember-me">Se souvenir de moi</label>
                        </div>*/}
                        <div className="mt-3 text-end">
                            <button type="submit" className="btn btn-primary">Connexion</button>
                        </div>
                    </form>
                    <div className="row mt-3">
                        <div className="col text-start">
                            <Link to="/signup">Pas encore de compte?</Link>
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

export default Login;
