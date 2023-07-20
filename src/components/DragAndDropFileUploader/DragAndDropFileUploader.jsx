import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useTranslation } from 'react-i18next';

import { imageFileTypes } from '../../utils/constants';

function DragAndDropFileUploader({
    changeFile,
    name,
    fileName,
    caption,
    isDisabled,
}) {
    const { t } = useTranslation('translation');

    return (
        <div className="fileUploader">
            <FileUploader
                handleChange={changeFile}
                name={name}
                types={imageFileTypes}
                hoverTitle=" "
                disabled={isDisabled}
            />
            <p className="mb-0 text-sm text-right">
                <em>
                    {t(caption)}
                    {fileName && `${fileName}`}
                </em>
            </p>
        </div>
    );
}

export default DragAndDropFileUploader;
