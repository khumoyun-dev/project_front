import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LogoSvg from './LogoSvg';

function Logo() {
    const navigate = useNavigate();
    const clickOnLogo = useCallback(() => {
        navigate.push('/');
    }, [navigate]);

    return (
        <Link href="/" onClick={clickOnLogo}>
            <div className="flex items-center">
                <LogoSvg />
                <p className='text-2xl font-medium'>mycollectoapp</p>
            </div>
        </Link>
    );
}

export default Logo;
