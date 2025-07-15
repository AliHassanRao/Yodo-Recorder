import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
               <Link to="/" className="text-white cursor-pointer">   <h1 className="text-2xl font-bold text-white tracking-wide">Yodo Recorder</h1> </Link> 
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                          
                        </li>
                        <li>
                            <Link to="/audio/merger" className="text-white cursor-pointer ">
                                Merge Audio
                            </Link>
                        </li>
                        <li>
                           
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
