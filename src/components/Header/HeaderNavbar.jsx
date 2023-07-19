import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useAppSelector } from '../../hooks/useRedux';

import { navLinks } from '../../utils/constants';

function HeaderNavbar() {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const isAdmin = useAppSelector((state) => state.user.isAdmin);
    const location = useLocation();
    const currentPath = location.pathname;
    const { t } = useTranslation('translation');

    return (
        <div>
            <nav className="navbar flex max-lg:flex-col max-lg:space-y-1 justify-between items-center space-x-5">
                <Logo />
                <div className="nav-links md:flex hidden items-center gap-3">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.id}
                            to={link.path}
                            end
                            className={`text-lg  ${currentPath === link.path ? 'text-primary font-medium' : 'text-textColor'} hover:text-primary hover:duration-300`}
                        >
                            {t(link.name)}
                        </NavLink>
                    ))}

                    {isLoggedIn && isAdmin && (
                        <li className="nav-item">
                            <NavLink
                                to="/admin"
                                className={`nav-link${currentPath.startsWith('/admin') ? ' active' : ''}`}
                            >
                                Admin
                            </NavLink>
                        </li>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default HeaderNavbar;
