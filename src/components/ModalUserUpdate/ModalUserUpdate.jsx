import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import UpdateUserForm from './UpdateUserForm';

const ModalUserUpdate = ({ isShown, setShown, setUpdateErrorShown, user }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });

    return (
        <Modal show={isShown} onHide={() => setShown(false)} centered>
            <Modal.Header closeButton className="bg-backgroundPrimaryColor border-1 border-linesColor">
                <Modal.Title>{t('userUpdateTitle')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-backgroundPrimaryColor border-1 border-linesColor rounded-b-0">
                <UpdateUserForm setModalShown={setShown} setUpdateErrorShown={setUpdateErrorShown} user={user} />
            </Modal.Body>
        </Modal>
    );
}

export default memo(ModalUserUpdate);
