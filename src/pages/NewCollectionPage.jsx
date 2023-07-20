import React from 'react';
import { Navigate } from 'react-router-dom';

import CollectionEditForm from '../components/CollectionEditForm/CollectionEditForm';

import { useAppSelector } from '../hooks/useRedux';

function NewCollectionPage() {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

    if (!isLoggedIn) {
        return React.createElement(Navigate, { to: '/' });
    }

    return (
        React.createElement('div', { className: 'content' },
            React.createElement(CollectionEditForm)
        )
    );
}

export default NewCollectionPage;
