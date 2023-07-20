import MDEditor from '@uiw/react-md-editor';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Image, Placeholder } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { setSelectedUser } from '../../redux/slices/adminSlice';

import ConfirmNotification from '../../components/ConfirmNotification/ConfirmNotification';
import EditDropdown from '../../components/EditDropdown/EditDropdown';
import Loader from '../../components/Loader/Loader';
import ErrorNotification from '../../components/Notification/Notification';

import { formatDateAndTime } from '../../utils/functions';

import useDeleteCollection from '../../hooks/useDeleteCollection';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';


function CollectionInfo() {
    const [confirmDeleteNotification, setConfirmDeleteNotification] = useState(false);
    const [isDeleteErrorShown, setDeleteErrorShown] = useState(false);
    const { user, isAdmin, isLoggedIn } = useAppSelector((state) => state.user);
    const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
    const selectedCollection = useAppSelector(
        (state) => state.collection.selectedCollection
    );
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { deleteCollection, isDeleteCollectionLoading } = useDeleteCollection(
        setDeleteErrorShown,
        selectedCollection?._id
    );

    const editActions = [
        {
            id: '1',
            title: `${t('collectionEdit')}`,
            action: () => navigate(`/collections/${selectedCollection?._id}/edit`),
        },
        {
            id: '2',
            title: `${t('collectionDelete')}`,
            action: () => setConfirmDeleteNotification(true),
        },
    ];

    return (
        <div className="flex flex-col gap-3 md:flex-row container pb-15 border-b-1 border-lines-color">
            <div className="image relative md:order-1 md:self-center">
                <div className="loading-skeleton absolute" />
                <Image src={selectedCollection?.image} className="absolute" />
            </div>
            <div className="description md:w-2/3 md:w-full">
                <div className="flex items-center justify-between">
                    <h2 className="title">
                        {!selectedCollection?.title ? (
                            <Placeholder className="loading-skeleton flex" animation="glow">
                                <Placeholder size="lg" />
                                Placeholder
                            </Placeholder>
                        ) : (
                            `${selectedCollection?.title}`
                        )}
                    </h2>
                    {((isAdmin && isLoggedIn) || user?._id === selectedCollection?.ownerId) && (
                        <div className="dropdown md:self-start md:mt-7">
                            <EditDropdown dropdownItems={editActions} />
                        </div>
                    )}
                </div>
                <p className="createdInfo mb-15">
                    {t('createdBy')}
                    <NavLink
                        to={isAdmin && isLoggedIn ? `/users/${selectedCollection?.ownerId}` : ''}
                        className={clsx('author', {
                            'authorLink': isAdmin && isLoggedIn,
                        })}
                        onClick={() => dispatch(setSelectedUser(null))}
                    >
                        <span>{selectedCollection?.ownerName} </span>
                    </NavLink>
                    <span>{formatDateAndTime(selectedCollection, t, 'createdAt')}</span>
                </p>

                <MDEditor.Markdown source={selectedCollection?.description} />
            </div>
            {isDeleteCollectionLoading && <Loader />}
            <ConfirmNotification
                isShown={confirmDeleteNotification}
                setShown={setConfirmDeleteNotification}
                onConfirm={() => {
                    deleteCollection();
                    setConfirmDeleteNotification(false);
                }}
                text={t('collectionDeleteConfirm')}
            />
            <ErrorNotification
                message="collectionPage.error"
                closeNotification={() => setDeleteErrorShown(false)}
                isShown={isDeleteErrorShown}
                variant="danger"
            />
        </div>
    );
}

export default CollectionInfo;
