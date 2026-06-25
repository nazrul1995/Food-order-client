import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/images/local-logo.png';
const Logo = () => {
    return (
        <>
                    {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 group transition">
              <img 
                src={logo} 
                alt="logo" 
                className="size-11 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-lime-500/30 transition-all" 
              />
              <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                LocalChef<span className="text-lime-400">Bazar</span>
              </span>
            </Link>
        </>
    );
};

export default Logo;