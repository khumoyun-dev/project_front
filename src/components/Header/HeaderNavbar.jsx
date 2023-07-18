import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import Logo from '../Logo/Logo';

import { navLinks } from '../../utils/constants';

function HeaderNavbar() {
    // const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    // const isAdmin = useAppSelector((state) => state.user.isAdmin);
    const location = useLocation();
    const currentPath = location.pathname;
    const { t } = useTranslation('translation');

    return (
        <div className="">
            <nav className="navbar flex justify-between items-center gap-5">
                <Logo />
                <div className="nav-links flex items-center gap-3">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.id}
                            to={link.path}
                            end
                            className={`text-lg ${currentPath === link.path ? 'text-purple-600 font-medium' : 'text-gray-600'} hover:text-purple-600 hover:duration-300`}
                        >
                            {t(link.name)}
                        </NavLink>
                    ))}

                    {/* {isLoggedIn && isAdmin && (
                            <li className="nav-item">
                                <NavLink
                                    to="/admin"
                                    className={`nav-link${currentPath.startsWith('/admin') ? ' active' : ''}`}
                                >
                                    Admin
                                </NavLink>
                            </li>
                        )} */}
                </div>
            </nav>
        </div>
    );
}

export default HeaderNavbar;
