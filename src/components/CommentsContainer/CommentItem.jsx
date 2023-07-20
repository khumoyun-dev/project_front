import React, { useState } from 'react';
import { Card, CloseButton, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { setSelectedUser } from '../../redux/slices/adminSlice';

import ConfirmNotification from '../../components/ConfirmNotification/ConfirmNotification';

import { formatDateAndTime } from '../../utils/functions';

import useDeleteComment from '../../hooks/useDeleteComment';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

function CommentItem({ comment }) {
    const [confirmDeleteNotification, setConfirmDeleteNotification] = useState(false);
    const [deletionConfirmed, setDeletionConfirmed] = useState(false);
    const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
    const { isAdmin, isLoggedIn, user } = useAppSelector((state) => state.user);
    const { deleteComment } = useDeleteComment(comment._id);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const confirmDeletion = () => {
        setConfirmDeleteNotification(false);
        setDeletionConfirmed(true);
        setTimeout(() => {
            deleteComment();
        }, 300);
    };

    const navigateToUserPage = () => {
        if (isAdmin && isLoggedIn) {
            dispatch(setSelectedUser(null));
            navigate(`/users/${comment.authorId}`);
        }
    };

    return (
        <>
            <Card
                body
                className={clsx(
                    'bg-backgroundPrimaryColor border-linesColor',
                    'card',
                    {
                        'animation-appear-0.3s-1': !deletionConfirmed,
                        'animation-disappear-0.5s-1': deletionConfirmed,
                    }
                )}
            >
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                        <div
                            className={clsx(
                                'avatar-sm position-relative',
                                {
                                    'transition-themeTransition': isAdmin && isLoggedIn,
                                }
                            )}
                            onClick={navigateToUserPage}
                            aria-hidden="true"
                        >
                            <div className="avatar-sm loading-skeleton position-absolute" />
                            <Image src={comment.authorAvatar} className="avatar-sm position-absolute" />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <p
                            className={clsx(
                                'font-weight-bold cursor-pointer break-words color-titleColor',
                                {
                                    'transition-themeTransition': isAdmin && isLoggedIn,
                                }
                            )}
                            onClick={navigateToUserPage}
                            aria-hidden="true"
                        >
                            {comment.authorName}
                        </p>
                        <p className="font-size-extraSmall color-textColorLight">
                            {t('commentsOn')}
                            {formatDateAndTime(comment, t, 'createdAt')}
                        </p>
                        <p className="font-size-small">{comment.text}</p>
                    </div>
                </div>
                {((isAdmin && isLoggedIn) || user?._id === comment.authorId) && (
                    <CloseButton
                        className="deleteButton"
                        onClick={() => setConfirmDeleteNotification(true)}
                    />
                )}
            </Card>
            <ConfirmNotification
                isShown={confirmDeleteNotification}
                setShown={setConfirmDeleteNotification}
                onConfirm={confirmDeletion}
                text={t('commentDeleteConfirm')}
            />
        </>
    );
}

export default CommentItem;
