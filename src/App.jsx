import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <Navbar/>
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
