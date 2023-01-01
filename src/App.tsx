import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Create } from './pages/create-post/create';
import { Navbar } from './components/navbar';
import { AnimatePresence } from "framer-motion";

function App() {
    return (
        <div className="App">
            <Router>
                <div className="bubbles">
                    <div id="b1"></div>
                    <div id="b2"></div>
                    <div id="b3"></div>
                    <div id="b4"></div>
                    <div id="b5"></div>
                </div>
                <Navbar />
                <AnimatePresence>
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/home' element={<Main />} />
                        <Route path='/create' element={<Create />} />
                    </Routes>
                </AnimatePresence>
            </Router>
        </div>
    );
}

export default App;