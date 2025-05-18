import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import MainPage from './pages/MainPage';

function App() {
    return (
        <AnimatePresence mode="wait">
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mainpage" element={<MainPage />} />
        </Routes>
        </AnimatePresence>
    )
}

export default App