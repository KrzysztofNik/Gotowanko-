import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './UI/Layout';
import CpmPage from './pages/CpmPage';
import AgentPage from "./pages/AgentPage";
import NoPage from './pages/NoPage';


function App() {
    return (<>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="cpm-solver" element={<CpmPage />} />
                        <Route path="agent-solver" element={<AgentPage />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
