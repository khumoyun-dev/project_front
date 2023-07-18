import clsx from 'clsx';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


function ConfirmNotification({ isShown, setShown, text, onConfirm }) {
    const { t } = useTranslation('translation', { keyPrefix: 'confirmNotification' });

    const handleConfirm = () => {
        onConfirm();
        setShown(false);
    };

    return (
        <Modal
            show={isShown}
            onHide={() => {
                setShown(false);
            }}
        >
            <Modal.Body className=''>
                {text}
            </Modal.Body>
            <Modal.Footer className=''>
                <Button
                    className="secondary-button"
                    onClick={() => {
                        setShown(false);
                    }}
                >
                    {t('cancel')}
                </Button>
                <Button className="primary-button" onClick={handleConfirm}>
                    {t('confirm')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmNotification;
