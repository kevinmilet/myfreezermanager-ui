import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/global_style.scss';

function App() {
    return (
        <div className="App">
            {/*<Navbar/>*/}
            <div>
                <Routes>
                    <Route path='login' element={<Login/>}/>
                    <Route path='signup' element={<SignUp/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
