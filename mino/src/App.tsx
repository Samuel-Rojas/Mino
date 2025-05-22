import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Testing from './pages/Testing';

function App() {
    return (
        <AnimatePresence mode="wait">
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/testing" element={<Testing />} />
        </Routes>
        </AnimatePresence>
    )
}

export default App