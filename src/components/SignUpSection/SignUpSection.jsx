import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/slices/modalAuthSlice';

function SignUpSection() {
    const { t } = useTranslation('translation', { keyPrefix: 'home' });
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col items-start gap-2 bg-backgroundSecondaryColor p-10 my-10">
            <h2 className='text-titleColor text-fontSizeH2 font-fontWeightMedium'>{t('noAccount')}</h2>
            <Button
                className="primary-button"
                onClick={() => dispatch(showModal('signUp'))}
            >
                {t('signup')}
            </Button>
        </div>
    );
}

export default SignUpSection;
