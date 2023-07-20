import React, { memo } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import ReactSelect from 'react-select';
import { v4 } from 'uuid';

import EmptyContainer from '../../../components/EmptyContainer/EmptyContainer';

import { customFieldsTypes, selectStyles } from '../../../utils/constants';

function CustomFieldsForm({
    fields,
    setFields,
    selectedCollection,
    startFieldsIds,
}) {
    const { t } = useTranslation('translation', { keyPrefix: 'collections' });

    const defaultCustomField = {
        id: v4(),
        type: '',
        label: '',
    };

    const customFieldTypesOptions = customFieldsTypes.map((type) => ({
        value: type,
        label: `${t(type)}`,
    }));

    const getValueFromOption = (value) =>
        value ? customFieldTypesOptions.find((option) => option.value === value) : '';

    const addField = () => {
        setFields((prev) => [...prev, defaultCustomField]);
    };

    const removeField = (fieldId) => {
        setFields((prev) => prev.filter((field) => field.id !== fieldId));
    };

    const updateField = (key, value, id) => {
        setFields((prev) =>
            prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
        );
    };
    return (
        <div className="container">
            <p className="prescription">{t('prescription')}</p>
            <div className="flex gap-3 items-center">
                <h4 className="mb-0">{t('customFields')}</h4>
                <OverlayTrigger placement="right" overlay={<Tooltip>{t('addField')}</Tooltip>}>
                    <button
                        type="button"
                        className="addFieldButton"
                        onClick={addField}
                    >
                        <AiFillPlusCircle />
                    </button>
                </OverlayTrigger>
            </div>
            <p className="note">
                {selectedCollection ? `${t('fieldsUpdateNote')}` : `${t('fieldsNote')}`}
            </p>
            <div className="mb-3">
                {fields.length > 0 ? (
                    fields.map((field) => (
                        <div className="flex gap-2 items-center" key={field.id}>
                            <Form.Group
                                className="mb-3 form-group w-3/4"
                                controlId="collectionFormTitle"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder={t('labelPlaceholder')}
                                    value={field.label}
                                    onChange={({ target }) => updateField('label', target.value, field.id)}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-group w-1/4"
                                controlId="collectionFormTheme"
                            >
                                <ReactSelect
                                    options={customFieldTypesOptions}
                                    placeholder={t('typePlaceholder')}
                                    onChange={(newValue) =>
                                        updateField('type', newValue.value, field.id)
                                    }
                                    value={getValueFromOption(field.type)}
                                    styles={selectStyles}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    isDisabled={!!selectedCollection && startFieldsIds.includes(field.id)}
                                />
                            </Form.Group>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>{t('removeField')}</Tooltip>}
                            >
                                <button
                                    type="button"
                                    className="removeFieldButton"
                                    onClick={() => removeField(field.id)}
                                >
                                    <AiFillMinusCircle />
                                </button>
                            </OverlayTrigger>
                        </div>
                    ))
                ) : (
                    <EmptyContainer title={t('emptyTitle')} text={t('emptyText')} />
                )}
            </div>
        </div>
    );
}

export default memo(CustomFieldsForm);
