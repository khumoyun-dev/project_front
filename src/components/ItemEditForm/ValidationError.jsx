import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function ValidationError({ errors }) {
    const { t } = useTranslation('translation', { keyPrefix: 'items' });

    return (
        <Form.Control.Feedback type="invalid">
            {errors.itemName?.type === 'required' && t('required')}
            {errors.itemName?.type === 'maxLength' && t('maxLength')}
        </Form.Control.Feedback>
    );
}

export default memo(ValidationError);
