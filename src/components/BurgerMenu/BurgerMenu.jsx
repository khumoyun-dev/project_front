import React, { useState } from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RxHamburgerMenu } from 'react-icons/rx';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { setSelectedUser } from '../../redux/slices/adminSlice';
import { setDefaultUsersFilters } from '../../redux/slices/filterSlice';
import { showModal } from '../../redux/slices/modalAuthSlice';
import { setDefaultUsersSorting } from '../../redux/slices/sortSlice';
import { setLoggedOut } from '../../redux/slices/userSlice';

import ConfirmNotification from '../../components/ConfirmNotification/ConfirmNotification';

import {
    burgerMenuLinks,
    burgerMenuLinksLoggedIn,
    navLinks,
    privateLink,
} from '../../utils/constants';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';


function BurgerMenu() {
    const [showMenu, setShowMenu] = useState(false);
    const [confirmLogOutNotification, setConfirmLogOutNotification] = useState(false);
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const isAdmin = useAppSelector((state) => state.user.isAdmin);
    const location = useLocation();
    const currentPath = location.pathname;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');

    const submitLogout = () => {
        dispatch(setSelectedUser(null));
        dispatch(setDefaultUsersSorting());
        dispatch(setDefaultUsersFilters());
        dispatch(setLoggedOut());
    };

    const handleOnClick = (
        actionId,
        path,
        event
    ) => {
        if (!path) {
            event?.preventDefault();
        }
        switch (actionId) {
            case 'signin': {
                dispatch(showModal('signIn'));
                break;
            }
            case 'signup': {
                dispatch(showModal('signUp'));
                break;
            }
            case 'logout': {
                setConfirmLogOutNotification(true);
                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        <>
            <button
                type="button"
                className='md:hidden block px-5 -mt-5 bg-transparent border-none text-2xl transition-colors text-black hover:text-purple-600'
                onClick={() => setShowMenu(true)}
            >
                <RxHamburgerMenu />
            </button>

            <Offcanvas
                show={showMenu}
                onHide={() => setShowMenu(false)}
                placement="end"
                className="bg-blue-400"
            >
                <Offcanvas.Header closeButton className="flex justify-end pt-4 pe-5" />
                <Offcanvas.Body>
                    <Nav className="flex flex-col gap-2" onClick={() => setShowMenu(false)}>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.id}
                                to={link.path}
                                end
                                className={`text-decoration-none transition-all duration-200 ease-out px-5 ${currentPath === link.path ? 'text-purple-600 font-medium' : 'text-gray-600'} hover:text-purple-600 hover:duration-300`}
                            >
                                {t(link.name)}
                            </NavLink>
                        ))}
                        {isLoggedIn && isAdmin && (
                            <NavLink
                                to={privateLink.path}
                                end
                                className={`text-decoration-none text-purple-500 transition-all duration-200 ease-out px-5 ${currentPath === privateLink.path ? 'text-purple-600 font-medium' : 'text-gray-600'} hover:text-purple-600 hover:duration-300`}
                            >
                                {t(privateLink.name)}
                            </NavLink>
                        )}
                        {(isLoggedIn ? burgerMenuLinksLoggedIn : burgerMenuLinks).map((link) => (
                            <NavLink
                                key={link.id}
                                to={link.path}
                                end
                                className={`text-decoration-none transition-all duration-200 ease-out px-5 ${currentPath === link.path ? 'text-purple-600 font-medium' : 'text-gray-600'} hover:text-purple-600 hover:duration-300`}
                                onClick={(event) => handleOnClick(link.id, link.path, event)}
                            >
                                {t(link.name)}
                            </NavLink>
                        ))}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
            <ConfirmNotification
                isShown={confirmLogOutNotification}
                setShown={setConfirmLogOutNotification}
                onConfirm={submitLogout}
                text={t('header.confirmLogOut')}
            />
        </>
    );
}

export default BurgerMenu;
