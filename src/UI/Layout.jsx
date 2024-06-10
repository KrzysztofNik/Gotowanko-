import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <div className='flex flex-col items-center pt-10 bg-main-bg text-main-text'>
            <header>
                <nav className="flex justify-center gap-6 mb-4 text-2xl">
                    <Link to="/" className="hover:text-main-green">Home</Link>
                    <Link to="/cpm-solver" className="hover:text-main-green">CPM Solver</Link>
                    <Link to="/agent-solver" className="hover:text-main-green">Agent Solver</Link>
                </nav>
            </header>
            <main className='flex flex-col w-[80%] items-center py-10 mb-20'>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
