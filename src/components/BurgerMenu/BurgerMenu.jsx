// import React, { useState } from 'react';
// import { Nav, Offcanvas } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import { NavLink, useLocation } from 'react-router-dom';
// import clsx from 'clsx';

// import { setSelectedUser } from '../../redux/slices/adminSlice';
// import { setDefaultUsersFilters } from '../../redux/slices/filterSlice';
// import { showModal } from '../../redux/slices/modalAuthSlice';
// import { setDefaultUsersSorting } from '../../redux/slices/sortSlice';
// import { setLoggedOut } from '../../redux/slices/userSlice';

// import ConfirmNotification from '../../components/ConfirmNotification/ConfirmNotification';

// import {
//     burgerMenuLinks,
//     burgerMenuLinksLoggedIn,
//     navLinks,
//     privateLink,
// } from '../../utils/constants';

// import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';


// function BurgerMenu() {
//     const [showMenu, setShowMenu] = useState(false);
//     const [confirmLogOutNotification, setConfirmLogOutNotification] = useState(false);
//     const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
//     const isAdmin = useAppSelector((state) => state.user.isAdmin);
//     const location = useLocation();
//     const currentPath = location.pathname;
//     const dispatch = useAppDispatch();
//     const { t } = useTranslation('translation');

//     const submitLogout = () => {
//         dispatch(setSelectedUser(null));
//         dispatch(setDefaultUsersSorting());
//         dispatch(setDefaultUsersFilters());
//         dispatch(setLoggedOut());
//     };

//     const handleOnClick = (
//         actionId,
//         path,
//         event
//     ) => {
//         if (!path) {
//             event?.preventDefault();
//         }
//         switch (actionId) {
//             case 'signin': {
//                 dispatch(showModal('signIn'));
//                 break;
//             }
//             case 'signup': {
//                 dispatch(showModal('signUp'));
//                 break;
//             }
//             case 'logout': {
//                 setConfirmLogOutNotification(true);
//                 break;
//             }
//             default: {
//                 break;
//             }
//         }
//     };

//     return (
//         <>
//             <button
//                 type="button"
//                 className='md:hidden block px-5 -mt-5 bg-transparent border-none text-2xl transition-colors text-black hover:text-purple-600'
//                 onClick={() => setShowMenu(true)}
//             >
//                 <RxHamburgerMenu />
//             </button>

//             <Offcanvas
//                 show={showMenu}
//                 onHide={() => setShowMenu(false)}
//                 placement="end"
//                 className="bg-blue-400"
//             >
//                 <Offcanvas.Header closeButton className="flex justify-end pt-4 pe-5" />
//                 <Offcanvas.Body>
//                     <Nav className="flex flex-col gap-2" onClick={() => setShowMenu(false)}>
//                         {navLinks.map((link) => (
//                             <NavLink
//                                 key={link.id}
//                                 to={link.path}
//                                 end
//                                 className={`text-decoration-none transition-all duration-200 ease-out px-5 ${currentPath === link.path ? 'text-purple-600 font-medium' : 'text-gray-600'} hover:text-purple-600 hover:duration-300`}
//                             >
//                                 {t(link.name)}
//                             </NavLink>
//                         ))}
//                         {isLoggedIn && isAdmin && (
//                             <NavLink
//                                 to={privateLink.path}
//                                 end
//                                 className={`text-decoration-none text-purple-500 transition-all duration-200 ease-out px-5 ${currentPath === privateLink.path ? 'text-purple-600 font-medium' : 'text-gray-600'} hover:text-purple-600 hover:duration-300`}
//                             >
//                                 {t(privateLink.name)}
//                             </NavLink>
//                         )}
//                         {(isLoggedIn ? burgerMenuLinksLoggedIn : burgerMenuLinks).map((link) => (
//                             <NavLink
//                                 key={link.id}
//                                 to={link.path}
//                                 end
//                                 className={`text-decoration-none transition-all duration-200 ease-out px-5 ${currentPath === link.path ? 'text-purple-600 font-medium' : 'text-gray-600'} hover:text-purple-600 hover:duration-300`}
//                                 onClick={(event) => handleOnClick(link.id, link.path, event)}
//                             >
//                                 {t(link.name)}
//                             </NavLink>
//                         ))}
//                     </Nav>
//                 </Offcanvas.Body>
//             </Offcanvas>
//             <ConfirmNotification
//                 isShown={confirmLogOutNotification}
//                 setShown={setConfirmLogOutNotification}
//                 onConfirm={submitLogout}
//                 text={t('header.confirmLogOut')}
//             />
//         </>
//     );
// }

// export default BurgerMenu;

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { Nav } from 'react-bootstrap';
import ConfirmNotification from '../../components/ConfirmNotification/ConfirmNotification';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

import { setSelectedUser } from '../../redux/slices/adminSlice';
import { setDefaultUsersFilters } from '../../redux/slices/filterSlice';
import { showModal } from '../../redux/slices/modalAuthSlice';
import { setDefaultUsersSorting } from '../../redux/slices/sortSlice';
import { setLoggedOut } from '../../redux/slices/userSlice';

import {
    burgerMenuLinks,
    burgerMenuLinksLoggedIn,
    navLinks,
    privateLink,
} from '../../utils/constants';

function BurgerMenu() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                className='md:hidden block px-5 bg-transparent border-none text-3xl transition-colors text-primary hover:text-primary-light'
                onClick={handleShow}
            >
                <RxHamburgerMenu />
            </button>

            <Transition.Root show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={handleClose}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-backgroundPrimaryColor py-6 shadow-xl">
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <Nav className="flex flex-col gap-2" onClick={handleClose}>
                                                    {navLinks.map((link) => (
                                                        <NavLink
                                                            key={link.id}
                                                            to={link.path}
                                                            end
                                                            className={`text-decoration-none text-lg transition-all duration-200 ease-out px-5 ${currentPath === link.path ? 'text-primary font-medium' : 'text-textColor'} hover:text-primary-light hover:duration-300`}
                                                        >
                                                            {t(link.name)}
                                                        </NavLink>
                                                    ))}
                                                    {isLoggedIn && isAdmin && (
                                                        <NavLink
                                                            to={privateLink.path}
                                                            end
                                                            className={`text-decoration-none transition-all duration-200 ease-out px-5 ${currentPath === privateLink.path ? 'text-primary font-medium' : 'text-textColor'} hover:text-primary-light hover:duration-300`}
                                                        >
                                                            {t(privateLink.name)}
                                                        </NavLink>
                                                    )}
                                                    {(isLoggedIn ? burgerMenuLinksLoggedIn : burgerMenuLinks).map((link) => (
                                                        <NavLink
                                                            key={link.id}
                                                            to={link.path}
                                                            end
                                                            className={`text-decoration-none text-lg transition-all duration-200 ease-out px-5 ${currentPath === link.path ? 'text-primary font-medium' : 'text-textColor'} hover:text-primary-light hover:duration-300`}
                                                            onClick={(event) => handleOnClick(link.id, link.path, event)}
                                                        >
                                                            {t(link.name)}
                                                        </NavLink>
                                                    ))}
                                                </Nav>

                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <ConfirmNotification
                isShown={confirmLogOutNotification}
                setShown={setConfirmLogOutNotification}
                onConfirm={submitLogout}
                text={t('header.confirmLogOut')}
            />
        </>
    )
}

export default BurgerMenu;