import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Journal from './pages/Journal';

function App() {
    return (
        <AnimatePresence mode="wait">
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/journal" element={<Journal />} />
        </Routes>
        </AnimatePresence>
    )
}

export default App