import React, { memo } from 'react';

import ThemeSwitcher from './ThemeSwitcher';
import SearchButton from './SearchButton';
import HeaderNavbar from './HeaderNavbar';
import LanguageSwitcher from './LanguageSwitcher';
import ButtonControls from './ButtonControls';
import BurgerMenu from '../BurgerMenu/BurgerMenu';


function Header() {
    return (
        <header className='border border-gray-300 px-6 py-4'>
            <div className='flex items-center justify-between'>
                <HeaderNavbar />
                <div className='flex items-center'>
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
