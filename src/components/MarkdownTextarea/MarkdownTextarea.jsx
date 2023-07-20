import MDEditor from '@uiw/react-md-editor';
import React from 'react';

function MarkdownTextarea({ value, setValue }) {
    return (
        <div data-color-mode="light">
            <MDEditor
                aria-required
                value={value}
                onChange={(val) => {
                    setValue(val);
                }}
            />
        </div>
    );
}

export default MarkdownTextarea;
