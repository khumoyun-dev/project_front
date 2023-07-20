import React, { useEffect, useState } from 'react';
import { Image, OverlayTrigger, Placeholder, Tooltip } from 'react-bootstrap';
import { AiFillLock } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { setSelectedUser } from '../../redux/slices/adminSlice';

import ConfirmNotification from '../../components/ConfirmNotification/ConfirmNotification';
import EditDropdown from '../../components/EditDropdown/EditDropdown';
import Loader from '../../components/Loader/Loader';
import ModalUserUpdate from '../../components/ModalUserUpdate/ModalUserUpdate';
import ErrorNotification from '../../components/Notification/Notification';

import useDeleteUser from '../../hooks/useDeleteUser';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import useUpdateUserByAdmin from '../../hooks/useUpdateUserByAdmin';


const UserInfo = ({ avatar, username, roles }) => {
    const user = useAppSelector((state) => state.user.user);
    const selectedUser = useAppSelector((state) => state.admin.selectedUser);
    const [confirmDeleteNotification, setConfirmDeleteNotification] = useState(false);
    const [isUpdateUserModalShown, setUpdateUserModalShown] = useState(false);
    const [isUpdateErrorShown, setUpdateErrorShown] = useState(false);
    const [isDeleteErrorShown, setDeleteErrorShown] = useState(false);
    const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (location.pathname === '/profile') {
            dispatch(setSelectedUser(null));
        }
    }, [selectedUser]);

    const { deleteUser, isDeleteUserLoading } = useDeleteUser(setDeleteErrorShown, selectedUser || user);

    const editActions = [
        { id: '1', title: `${t('userEdit')}`, action: () => setUpdateUserModalShown(true) },
        { id: '2', title: `${t('userDelete')}`, action: () => setConfirmDeleteNotification(true) },
    ];

    const { setEditActions, isUpdateUserLoading } = useUpdateUserByAdmin(selectedUser, editActions);

    return (
        <>
            <div className={clsx('d-flex gap-4 justify-content-between', 'infoContainer')}>
                <div className="d-flex gap-4 flex-column flex-sm-row">
                    <div className="avatar position-relative">
                        <div className="avatar loading-skeleton position-absolute" />
                        <Image src={avatar} className="avatar position-absolute" />
                    </div>
                    <div>
                        <h1 className={clsx('title', !username && 'loading-skeleton d-flex', 'animation-glow')}>
                            {username ? username : <Placeholder size="lg" />}
                        </h1>
                        <p className="mt-0 mb-0">
                            <em className="me-2">{t(roles?.includes('admin') ? 'admin' : 'user')}</em>
                            <OverlayTrigger placement="right" overlay={<Tooltip>{t('blocked')}</Tooltip>}>
                                <span className="blockedIcon">
                                    {location.pathname !== '/profile' && selectedUser?.isBlocked && <AiFillLock />}
                                </span>
                            </OverlayTrigger>
                        </p>
                    </div>
                </div>
                <EditDropdown dropdownItems={setEditActions()} />
                <ConfirmNotification
                    isShown={confirmDeleteNotification}
                    setShown={setConfirmDeleteNotification}
                    onConfirm={() => {
                        deleteUser();
                        setConfirmDeleteNotification(false);
                    }}
                    text={t('userDeleteConfirm')}
                />
                <ModalUserUpdate
                    isShown={isUpdateUserModalShown}
                    setShown={setUpdateUserModalShown}
                    setUpdateErrorShown={setUpdateErrorShown}
                    user={selectedUser || user}
                />
                {(isDeleteUserLoading || isUpdateUserLoading) && <Loader />}
            </div>
            <ErrorNotification
                message="profilePage.userUpdateError"
                closeNotification={() => setUpdateErrorShown(false)}
                isShown={isUpdateErrorShown}
                variant="danger"
            />
            <ErrorNotification
                message="profilePage.adminDeleteError"
                closeNotification={() => setDeleteErrorShown(false)}
                isShown={isDeleteErrorShown}
                variant="danger"
            />
        </>
    );
};

export default UserInfo;
