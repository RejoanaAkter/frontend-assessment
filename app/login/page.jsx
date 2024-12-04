"use client"

import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            if (email === storedUser.email && password === storedUser.password) {
                setMessage(`Welcome back, ${storedUser.name}!`);
            } else {
                setMessage('Incorrect email or password.');
            }
        } else {
            setMessage('No user found. Please sign up first.');
        }
    };
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-amber-800 mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-700">Password</p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
                Login
            </button>
        </form>

        {message && (
            <p
                className={`mt-4 text-center text-sm ${
                    message.includes('successful') ? 'text-green-600' : 'text-red-600'
                }`}
            >
                {message}
            </p>
        )}
    </div>
</div>
  );
};

export default Login;
