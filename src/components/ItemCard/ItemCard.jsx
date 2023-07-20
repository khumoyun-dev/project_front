import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';


import { setSelectedUser } from '../../redux/slices/adminSlice';
import { setSelectedCollection } from '../../redux/slices/collectionSlice';
import { setSelectedItem } from '../../redux/slices/itemSlice';

import ConfirmNotification from '../../components/ConfirmNotification/ConfirmNotification';
import EditDropdown from '../../components/EditDropdown/EditDropdown';
import Loader from '../../components/Loader/Loader';
import ErrorNotification from '../../components/Notification/Notification';

import { formatDateAndTime } from '../../utils/functions';

import useDeleteItem from '../../hooks/useDeleteItem';
import useLikeItem from '../../hooks/useLikeItem';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import useWindowSize from '../../hooks/useWindowSize';

function ItemCard({ item }) {
    const [confirmDeleteNotification, setConfirmDeleteNotification] = useState(false);
    const [isDeleteErrorShown, setDeleteErrorShown] = useState(false);
    const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
    const { user, isAdmin, isLoggedIn } = useAppSelector((state) => state.user);
    const [imageVariant, setImageVariant] = useState('left');
    const windowSize = useWindowSize();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const { deleteItem, isDeleteItemLoading } = useDeleteItem(setDeleteErrorShown, item?._id);

    const { likeItem, removeLike } = useLikeItem(item);

    useEffect(() => {
        if (windowSize.width < 768) {
            setImageVariant('top');
        } else {
            setImageVariant('left');
        }
    }, [windowSize]);

    const editActions = [
        {
            id: '1',
            title: `${t('itemEdit')}`,
            action: () => navigate(`/items/${item?._id}/edit`),
        },
        {
            id: '2',
            title: `${t('itemDelete')}`,
            action: () => setConfirmDeleteNotification(true),
        },
    ];

    return (
        <Card className="min-h-200 transition bg-backgroundPrimaryColor border-linesColor relative">
            <div className="absolute left-0 right-0 top-0 bottom-0">
                <div className="loading-skeleton" />
                <Card.Img
                    alt={`${item?.itemName}-image`}
                    variant={imageVariant}
                    className="object-cover h-full w-200 border-r-bs-cardInnerBorderRadius border-l-bs-cardInnerBorderRadius"
                    src={item?.itemImage}
                />
            </div>
            <Card.Body className="ml-200 flex flex-col justify-between">
                <div>
                    <Card.Title className="font-semibold text-2xl mb-2">
                        {!item?.itemName ? <div className="loading-skeleton" /> : item?.itemName}
                    </Card.Title>
                    <Card.Subtitle className="text-textColorLight">
                        {!item?.collectionName ? (
                            <div className="loading-skeleton" />
                        ) : (
                            <>
                                {t('itemFrom')}
                                <NavLink
                                    to={`/collections/${item?.collectionId}`}
                                    className="color-textColorLight transition hover:opacity-hoverOpacity"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        dispatch(setSelectedCollection(null));
                                        dispatch(setSelectedItem(null));
                                    }}
                                >
                                    {item?.collectionName}
                                </NavLink>
                            </>
                        )}
                    </Card.Subtitle>
                    <Card.Text>
                        {t('createdBy')}
                        <NavLink
                            to={isAdmin && isLoggedIn ? `/users/${item?.ownerId}` : ''}
                            className={clsx('color-secondaryColor', {
                                'hover:cursor-default': isAdmin && isLoggedIn,
                                'hover:underline hover:color-secondaryColor':
                                    isAdmin && isLoggedIn && !item?.ownerId,
                            })}
                            onClick={(event) => {
                                event.stopPropagation();
                                dispatch(setSelectedUser(null));
                            }}
                        >
                            <span>{item?.ownerName}</span>
                        </NavLink>
                        <span> {formatDateAndTime(item, t, 'createdAt')}</span>
                    </Card.Text>
                </div>
                <div
                    className={clsx('flex gap-2 color-textColor', {
                        'hover:cursor-pointer': isLoggedIn && user,
                    })}
                >
                    {isLoggedIn && user && item?.likes.includes(user?._id) ? (
                        <FaHeart onClick={(event) => removeLike(event)} />
                    ) : (
                        <FaRegHeart onClick={(event) => likeItem(event)} />
                    )}
                    {item?.likes.length}
                </div>
            </Card.Body>
            {((isAdmin && isLoggedIn) || user?._id === item?.ownerId) && (
                <div
                    className={clsx('absolute right-0', {
                        hidden: !currentPath.includes('/items'),
                    })}
                >
                    <EditDropdown dropdownItems={editActions} />
                </div>
            )}
            {isDeleteItemLoading && <Loader />}
            <ConfirmNotification
                isShown={confirmDeleteNotification}
                setShown={setConfirmDeleteNotification}
                onConfirm={() => {
                    deleteItem();
                    setConfirmDeleteNotification(false);
                }}
                text={t('itemDeleteConfirm')}
            />
            <ErrorNotification
                message="itemPage.error"
                closeNotification={() => setDeleteErrorShown(false)}
                isShown={isDeleteErrorShown}
                variant="danger"
            />
        </Card>
    );
}

export default ItemCard;
