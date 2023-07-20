import React, { memo } from 'react';
import { MdClose, MdDone } from 'react-icons/md';
import MDEditor from '@uiw/react-md-editor';
import clsx from 'clsx';

import { defaultInputTypes } from '../../utils/constants';


function CustomFieldsContainer({ fields }) {
    return (
        <div className="border-t border-lines-color border-b">
            {fields &&
                fields.length > 0 &&
                fields.map((field) => (
                    <div
                        key={field.customFieldId}
                        className="flex flex-col sm:flex-row gap-sm-3 mt-3 mb-3"
                    >
                        <div className="w-30 font-bold">
                            {field.label}:
                        </div>
                        <div className="w-70">
                            {defaultInputTypes.includes(field.type) && (field.value || '⎯')}
                            {field.type === 'text' && (
                                <MDEditor.Markdown
                                    source={field.value || '⎯'}
                                    className={clsx(
                                        'transition-themeTransition bg-background-primary-color',
                                        'textarea'
                                    )}
                                />
                            )}
                            {field.type === 'checkbox' &&
                                (field.value === 'true' ? (
                                    <div className="checkboxTrue">
                                        <MdDone />
                                    </div>
                                ) : (
                                    <MdClose />
                                ))}
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default memo(CustomFieldsContainer);
