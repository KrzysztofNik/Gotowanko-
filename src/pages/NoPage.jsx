import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
    return (
        <div className="flex flex-col items-center h-screen mt-20">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-lg">The page you're looking for cannot be found.</p>
            <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXBjNWV4M2NjbWJuNnpmdXg0c2ZremF1djRuY3lhOW8yYmpuZXZxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dHM/hS42TuYYnANLFR9IRQ/giphy.gif"
                alt="404 Error"
                style={{ maxWidth: '400px', width: '100%' }}
            />
            <Link to="/" className="text-blue-500 text-lg hover:underline">
                Go back to the homepage
            </Link>
        </div>
    );
}

export default NoPage;
