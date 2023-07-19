import React, { memo } from 'react';

import ThemeSwitcher from './ThemeSwitcher';
import SearchButton from './SearchButton';
import HeaderNavbar from './HeaderNavbar';
import LanguageSwitcher from './LanguageSwitcher';
import ButtonControls from './ButtonControls';
import BurgerMenu from '../BurgerMenu/BurgerMenu';


function Header() {
    return (
        <header className='bg-backgroundPrimaryColor border-b border-linesColor px-6 py-4'>
            <div className='flex max-sm:flex-col max-sm:space-y-4 items-center justify-between space-x-3'>
                <HeaderNavbar />
                <div className='flex items-center space-x-5'>
                    <ThemeSwitcher />
                    <SearchButton />
                    <LanguageSwitcher />
                    <ButtonControls />
                    <BurgerMenu />
                </div>
            </div>
        </header>
    );
}

export default memo(Header);
