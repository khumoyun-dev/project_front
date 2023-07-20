import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Card, Form, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IoMdSend } from 'react-icons/io';

import Loader from '../../components/Loader/Loader';

import useCreateComment from '../../hooks/useCreateComment';
import { useAppSelector } from '../../hooks/useRedux';

function CommentTextarea() {
    const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
    const [commentText, setCommentText] = useState('');
    const user = useAppSelector((state) => state.user.user);
    const { sendComment, isNewCommentLoading } = useCreateComment(
        commentText,
        setCommentText
    );

    const sendCommentOnEnter = (e) => {
        if (e.code === 'Enter') {
            sendComment();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', sendCommentOnEnter);

        return () => document.removeEventListener('keydown', sendCommentOnEnter);
    }, [commentText]);

    return (
        <>
            <Card body className="bg-background-primary-color border-none">
                <div className="flex items-center gap-4">
                    <div className={clsx('avatar-sm', 'avatarWrapper', 'hidden', 'md:flex')}>
                        <div className="avatar-sm relative">
                            <div className="avatar-sm loading-skeleton absolute" />
                            <Image src={user?.avatar} className="avatar-sm absolute" />
                        </div>
                    </div>
                    <Form.Control
                        as="textarea"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder={t('commentPlaceholder')}
                    />
                    <button
                        type="button"
                        className="w-12 bg-transparent border-none"
                        disabled={!commentText}
                        onClick={sendComment}
                    >
                        <IoMdSend className="text-primary-color text-xl transition-all hover:text-primary-color-light transform hover:scale-110 disabled:text-light-color" />
                    </button>
                </div>
            </Card>
            {isNewCommentLoading && <Loader />}
        </>
    );
}

export default CommentTextarea;
