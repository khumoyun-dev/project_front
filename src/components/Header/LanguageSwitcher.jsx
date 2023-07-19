import React, { useCallback, useEffect, useState } from 'react';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import i18next from 'i18next';
import i18n from '../../languages/i18n';

function LanguageSwitcher() {
    const [language, setLanguage] = useState(i18next.language);

    const changeLanguage = useCallback(() => {
        const newLanguage = i18next.language === 'en' ? 'ru' : 'en';
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);
    }, []);

    useEffect(() => {
        setLanguage(i18next.language);
    }, []);

    return (
        <div className="flex items-center">
            {language === 'en' ? (
                <button
                    className="mr-2"
                    onClick={changeLanguage}
                    aria-label="Toggle language"
                >
                    <BsToggle2On className="text-4xl text-textColor cursor-pointer" />
                </button>
            ) : (
                <button
                    className="mr-2"
                    onClick={changeLanguage}
                    aria-label="Toggle language"
                >
                    <BsToggle2Off className="text-4xl text-textColor cursor-pointer" />
                </button>
            )}
            <div className="text-sm font-medium">
                <button className="text-textColor hover:underline">
                    {language === 'en' ? 'EN' : 'RU'}
                </button>
            </div>
        </div>
    );
}

export default LanguageSwitcher;
