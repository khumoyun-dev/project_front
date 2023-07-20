import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '../Logo/Logo';

import { authorsContacts } from '../../utils/constants';

function Footer() {
    const { t } = useTranslation('translation', { keyPrefix: 'footer' });

    return (
        <footer>
            <div className='px-[10px] py-[15px] flex-col xs:flex justify-between items-center h-[70px] gap-[10px] xs:h-[130px]'>
                <Logo />
                <div className="flex flex-col items-center gap-1">
                    <div className="flex gap-2">
                        {authorsContacts.map((contact) => (
                            <a
                                key={contact.id}
                                href={contact.link}
                                target="_blank"
                                title={contact.title}
                                rel="noreferrer"
                                className='transition-all ease-out duration-200 text-[20px] text-textColor'
                            >
                                {contact.icon}
                            </a>
                        ))}
                    </div>
                    <p className='text-xs'>{t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
}

export default memo(Footer);
