import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/global_style.scss';
import Forgot from "./components/Forgot";
import {useEffect} from "react";
import axios from "axios";

export const AUTH_TOKEN_KEY = 'jhi-authentificationToken';

function App() {

    useEffect(() => {
        axios.interceptors.request.use(function (request) {
                const token = sessionStorage.getItem(AUTH_TOKEN_KEY);

                if (token) {
                    request.headers.Authorization = `Bearer ${token}`;
                }
                return request;
            }, error => {
                return Promise.reject(error);
            }
        )
    }, []);


    return (
        <div className="App">
            {/*<Navbar/>*/}
            <div>
                <Routes>
                    <Route path='login' element={<Login/>}/>
                    <Route path='signup' element={<SignUp/>}/>
                    <Route path='forgot_password' element={<Forgot/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
