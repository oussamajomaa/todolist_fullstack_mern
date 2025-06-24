import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const linkClass = ({ isActive }) =>
        isActive ? 'text-blue-600 font-bold' : 'hover:underline';

    return (
        <div className="bg-amber-200 h-16 flex items-center justify-between px-5">

            {/* Burger menu - Mobile */}
            <div className="lg:hidden relative" ref={dropdownRef}>
                <button
                    className="btn btn-ghost btn-circle"
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </button>

                {menuOpen && (
                    <div className="absolute mt-2 left-0 flex flex-col gap-3 w-40 p-5 shadow bg-amber-200 rounded z-50">
                        <NavLink to="/tasks" className={linkClass} onClick={() => setMenuOpen(false)}>Tasks</NavLink>
                        <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Login</NavLink>
                        <NavLink to="/admin" className={linkClass} onClick={() => setMenuOpen(false)}>Admin</NavLink>
                    </div>
                )}
            </div>

            {/* Menu Desktop */}
            <div className="hidden lg:flex gap-5">
                <NavLink to="/tasks" className={linkClass}>Tasks</NavLink>
                <NavLink to="/" className={linkClass}>Login</NavLink>
                <NavLink to="/admin" className={linkClass}>Admin</NavLink>
            </div>
        </div>
    );
}
