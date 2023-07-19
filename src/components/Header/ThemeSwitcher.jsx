import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

import useTheme from '../../hooks/useTheme';

function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const switchLightTheme = () => {
        setTheme('light');
    };

    const switchDarkTheme = () => {
        setTheme('dark');
    };

    return (
        <div>
            {theme === 'light' ? (
                <button type="button" className="transition-transform hover:duration-1000" onClick={switchDarkTheme}>
                    <BsFillSunFill className="text-4xl text-orange-500 transform transition-transform hover:rotate-180" />
                </button>
            ) : (
                <button type="button" className="transition-transform hover:duration-1000" onClick={switchLightTheme}>
                    <BsFillMoonFill className="text-3xl text-primary transform transition-transform hover:rotate-12" />
                </button>
            )}
        </div>
    );
}

export default ThemeSwitcher;
