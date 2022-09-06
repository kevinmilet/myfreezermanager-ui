import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/global_style.scss';
import Forgot from "./components/Forgot";
import {useEffect, useState} from "react";
import axios from "axios";
import MyFreezers from "./components/MyFreezers";
import EditFreezers from "./components/EditFreezers";
import MyProducts from "./components/MyProducts";
import Navbar from "./components/Navbar";

export const AUTH_TOKEN_KEY = 'jhi-authentificationToken';

function App() {

    const [userInfos, setUserInfos] = useState();

    useEffect(() => {
        axios.interceptors.request.use(function (request) {
            const token = sessionStorage.getItem(AUTH_TOKEN_KEY);

            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        }, error => {
            return Promise.reject(error);
        });
    }, []);


    return (
        <>
            <div className="App">
                {
                    userInfos &&
                    <Navbar userInfos={userInfos} setUserInfos={setUserInfos}/>
                }
                <div>
                    <Routes>
                        <Route path='mes_congelateurs' element={<MyFreezers/>}/>
                        <Route path='congelateur/:freezerId' element={<EditFreezers/>}/>
                        <Route path='mes_produits' element={<MyProducts/>}/>
                        <Route path='produit/:productId' element={<EditFreezers/>}/>
                        <Route path='signup' element={<SignUp setUserInfos={setUserInfos}/>}/>
                        <Route path='forgot_password' element={<Forgot/>}/>
                        <Route path='*' element={<Login setUserInfos={setUserInfos}/>}/>
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
