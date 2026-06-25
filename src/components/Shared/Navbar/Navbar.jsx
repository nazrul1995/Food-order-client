import Container from '../Container';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import avatarImg from '../../../assets/images/placeholder.jpg';
import Logo from '../Logo';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Meals', path: '/meals' },
    { name: 'Chefs', path: '/chefs' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full bg-slate-950/80 backdrop-blur-xl z-50 border-b border-slate-900 shadow-xl">
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between">
            <Logo />
            {/* DESKTOP NAVIGATION */}
            <div className="hidden md:flex items-center gap-8 font-medium text-sm">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative py-1 transition-colors ${isActive
                      ? 'text-lime-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="navUnderline"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-lime-400 rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* RIGHT SIDE: AUTH & PROFILE */}
            <div className="flex items-center gap-4">
              {user ? (
                /* Authenticated State Dropdown */
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
                  >
                    <img
                      className="size-8 rounded-full object-cover ring-2 ring-lime-500/20"
                      referrerPolicy="no-referrer"
                      src={user?.photoURL || avatarImg}
                      alt="profile"
                    />
                    <AiOutlineMenu size={16} className="text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden py-1 z-50 text-sm"
                      >
                        <div className="px-4 py-2 border-b border-slate-800/60 max-w-full">
                          <p className="text-xs text-slate-500 truncate font-medium">Signed in as</p>
                          <p className="text-slate-300 font-semibold truncate">{user?.displayName || 'User'}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-lime-400 transition"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={logOut}
                          className="w-full text-left px-4 py-2.5 text-rose-400 hover:bg-rose-500/10 transition border-t border-slate-800/60"
                        >
                          Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Guest State Buttons */
                <div className="hidden md:flex items-center gap-4 text-sm font-semibold">
                  <Link to="/login" className="text-slate-400 hover:text-slate-200 transition">
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 bg-lime-500 text-slate-950 rounded-xl hover:bg-lime-400 hover:shadow-[0_0_20px_rgba(132,204,22,0.15)] transition"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* MOBILE MENU TOGGLE BUTTON */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 md:hidden rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              >
                {isMobileMenuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
              </button>
            </div>

          </div>
        </Container>
      </div>

      {/* MOBILE DRAWER NAVIGATION */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-900 bg-slate-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col font-medium text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors ${isActive(link.path) ? 'text-lime-400' : 'text-slate-400'}`}
                >
                  {link.name}
                </Link>
              ))}

              {!user && (
                <div className="pt-4 border-t border-slate-900 grid grid-cols-2 gap-4 text-center text-sm font-semibold">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 border border-slate-800 rounded-xl text-slate-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 bg-lime-500 text-slate-950 rounded-xl"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;