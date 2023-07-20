import React, { memo, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { closeModal } from '../../redux/slices/modalAuthSlice';

import Loader from '../../components/Loader/Loader';
import ErrorNotification from '../../components/Notification/Notification';

import useAuth from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

import AuthForm from './AuthForm';

function ModalAuth() {
    const { id, isShown } = useAppSelector((state) => state.authModal);
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });
    const [isSignUpErrorShown, setSignUpErrorShown] = useState(false);
    const [isSignInErrorShown, setSignInErrorShown] = useState(false);
    const { submitForm, isLoadingAuth, signUpErrorMessage, signInErrorMessage } =
        useAuth(id);

    const isButtonDisabled = isSignUpErrorShown || isSignInErrorShown || isLoadingAuth;

    const closeSignUpErrorNotification = () => {
        setSignUpErrorShown(false);
    };

    const closeSignInErrorNotification = () => {
        setSignInErrorShown(false);
    };

    useEffect(() => {
        if (signUpErrorMessage) {
            setSignUpErrorShown(true);
        }
    }, [signUpErrorMessage]);

    useEffect(() => {
        if (signInErrorMessage) {
            setSignInErrorShown(true);
        }
    }, [signInErrorMessage]);

    return (
        <>
            <Modal show={isShown} onHide={() => dispatch(closeModal())} centered>
                <Modal.Header
                    closeButton
                    className="bg-backgroundPrimaryColor border border-linesColor"
                >
                    <Modal.Title>{t(`${id}`)}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-backgroundPrimaryColor border-t border-l border-r border-linesColor rounded-b-sm border-0">
                    <AuthForm
                        submitForm={submitForm}
                        isInputDisabled={isLoadingAuth}
                        isButtonDisabled={isButtonDisabled}
                    />
                </Modal.Body>
            </Modal>
            <ErrorNotification
                message={`auth.${signUpErrorMessage}`}
                closeNotification={closeSignUpErrorNotification}
                isShown={isSignUpErrorShown}
                variant="danger"
            />
            <ErrorNotification
                message={`auth.${signInErrorMessage}`}
                closeNotification={closeSignInErrorNotification}
                isShown={isSignInErrorShown}
                variant="danger"
            />
            {isLoadingAuth && <Loader />}
        </>
    );
}

export default memo(ModalAuth);
