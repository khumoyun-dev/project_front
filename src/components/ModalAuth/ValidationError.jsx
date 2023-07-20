import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function ValidationError({ errors, field }) {
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });
    const language = localStorage.getItem('i18nextLng');

    return (
        <Form.Control.Feedback type="invalid" id={`${field}${language}`}>
            {errors[field]?.type &&
                errors[field]?.type !== 'pattern' &&
                `${t(`${errors[field]?.type}`, { value: t(field) })}`}
            {field === 'email' && errors[field]?.type === 'pattern' && `${t('patternEmail')}`}
        </Form.Control.Feedback>
    );
}

ValidationError.propTypes = {
    errors: PropTypes.object.isRequired,
    field: PropTypes.oneOf(['username', 'email', 'password']).isRequired,
};

export default ValidationError;
