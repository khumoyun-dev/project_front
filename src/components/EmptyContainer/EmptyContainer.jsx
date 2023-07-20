import React from 'react';

function EmptyContainer({ title, text }) {
    return (
        <div className="content text-center mt-4 mb-5">
            <h2 className='text-textColorLight'>{title}</h2>
            <h2 className='text-textColorLight'>{text}</h2>
        </div>
    );
}

export default EmptyContainer;
