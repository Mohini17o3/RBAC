'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

function Navbar() {
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const localToken = localStorage.getItem("token");

        if (localToken) {
            const decodedToken = JSON.parse(atob(localToken.split(".")[1]));

            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                setIsTokenExpired(true);
            } else {
                setIsTokenExpired(false);
            }
        } else {
            setIsTokenExpired(true);
        }
    }, []);

    return (
        <>
            <div className="flex justify-between items-center w-full fixed top-0 p-4 bg-purple-300 shadow-md z-10 sm:text-sm md:text-base">


                <div className="hidden md:flex space-x-6 text-sm">
                    <Link href="/" className="cursor-pointer text-purple-500 hover:text-gray-300 transition font-bold">Home</Link>
                    <a className="cursor-pointer text-purple-500 hover:text-gray-300 font-bold transition">Features</a>
                    <a className="cursor-pointer text-purple-500 hover:text-gray-300 font-bold transition">Contact</a>
                </div>

                <div className="hidden md:flex space-x-4 items-center">
                    {isTokenExpired ? (
                        <Link href="/Login">
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-400 hover:text-white border border-purple-500 transition">
                                Login
                            </button>
                        </Link>
                    ) : (
                        <Link href="/Dashboard">
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-400 hover:text-white border border-purple-500 transition">
                                Dashboard
                            </button>
                        </Link>
                    )}

                    <Link href="/SignUp">
                        <button className="bg-white text-purple-500 px-4 py-2 rounded-md font-semibold hover:bg-purple-400 hover:text-white border border-purple-500 transition">
                            Sign Up
                        </button>
                    </Link>
                </div>

                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-purple-500 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-purple-300 shadow-md fixed top-16 left-0 w-full p-4 z-10">
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="text-purple-500 hover:text-gray-300 transition font-bold">Home</Link>
                        <a className="text-purple-500 hover:text-gray-300 font-bold transition">Features</a>
                        <a className="text-purple-500 hover:text-gray-300 font-bold transition">Contact</a>
                        {isTokenExpired ? (
                            <Link href="/Login">
                                <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-400 hover:text-white border border-purple-500 transition">
                                    Login
                                </button>
                            </Link>
                        ) : (
                            <Link href="/Dashboard">
                                <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-400 hover:text-white border border-purple-500 transition">
                                    Dashboard
                                </button>
                            </Link>
                        )}
                        <Link href="/SignUp">
                            <button className="bg-white text-purple-500 px-4 py-2 rounded-md font-semibold hover:bg-purple-400 hover:text-white border border-purple-500 transition">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
