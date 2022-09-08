import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/global_style.scss';
import Forgot from "./components/User/Forgot";
import {useEffect, useState} from "react";
import axios from "axios";
import MyFreezers from "./components/Freezer/MyFreezers";
import MyProducts from "./components/Product/MyProducts";
import Navbar from "./components/Navbar";
import {Container} from "react-bootstrap";
import FreezerDetails from "./components/Freezer/FreezerDetails";
import EditProduct from "./components/Product/EditProduct";

export const AUTH_TOKEN_KEY = 'jhi-authentificationToken';

const UserConnected = ({userInfos, setUserInfos}) => {
    const  history = useNavigate();
    let location = useLocation();

    useEffect(() => {
        setUserInfos(null);
        axios.get('/isConnected').then(response => {
            setUserInfos(response.data);
        }, () => {
            if (!location.pathname === '/signup') {
                history('/login');
            }
        })
    }, [history, location.pathname, setUserInfos]);

    return (
        <>
            {userInfos && <Navbar userInfos={userInfos} setUserInfos={setUserInfos} />}
        </>
    )
};

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
            <Container>
                <UserConnected userInfos={userInfos} setUserInfos={setUserInfos} />
                <div>
                    <Routes>
                        <Route path='mes_congelateurs' element={<MyFreezers/>}/>
                        <Route path='congelateur/:freezerId' element={<FreezerDetails/>}/>
                        <Route path='mes_produits' element={<MyProducts/>}/>
                        <Route path='produit/:productId' element={<EditProduct/>}/>
                        <Route path='signup' element={<SignUp setUserInfos={setUserInfos}/>}/>
                        <Route path='forgot_password' element={<Forgot/>}/>
                        <Route path='*' element={<Login setUserInfos={setUserInfos}/>}/>
                    </Routes>
                </div>
            </Container>
        </>
    );
}

export default App;
