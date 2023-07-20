import React, { memo, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setCustomFieldsValues } from '../../../redux/slices/itemSlice';

import MarkdownTextarea from '../../../components/MarkdownTextarea/MarkdownTextarea';

import { defaultInputTypes } from '../../../utils/constants';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';

function CustomFieldInput({ field, fieldIndex, fieldsValues }) {
    const { t } = useTranslation('translation', { keyPrefix: 'items' });
    const [inputValue, setInputValue] = useState(fieldsValues[fieldIndex] || '');
    const customFieldsValues = useAppSelector((state) => state.item.customFieldsValues);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const newFieldsValues = customFieldsValues.slice();
        newFieldsValues[fieldIndex] = inputValue;
        dispatch(setCustomFieldsValues(newFieldsValues));
    }, [inputValue]);

    return (
        <div className="mb-3">
            <label className="block font-bold text-sm text-gray-700">
                {field.label} ({t(field.type)})
            </label>
            {defaultInputTypes.includes(field.type) && (
                <input
                    value={inputValue}
                    type={field.type}
                    onChange={({ target }) => setInputValue(target.value)}
                    className="mt-1 px-2 py-1 block w-full rounded border focus:outline-none focus:ring focus:border-blue-300"
                />
            )}
            {field.type === 'text' && (
                <MarkdownTextarea value={inputValue} setValue={setInputValue} />
            )}
            {field.type === 'checkbox' && (
                <div className="flex gap-2 items-center mt-1">
                    <span className="text-sm">No</span>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            onChange={({ target }) => setInputValue(target.checked ? 'true' : 'false')}
                            checked={inputValue === 'true'}
                            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:border-blue-300"
                        />
                        <span className="ml-2 text-sm">Yes</span>
                    </label>
                </div>
            )}
        </div>
    );
}

export default memo(CustomFieldInput);
