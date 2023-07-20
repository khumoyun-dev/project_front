import { useCreateCommentMutation } from '../redux/api/commentApiSlice';

import { useAppSelector } from './useRedux';

const useCreateComment = (commentText, setCommentText) => {
    const [createComment, { isLoading: isNewCommentLoading }] = useCreateCommentMutation();
    const user = useAppSelector((state) => state.user.user);
    const selectedItem = useAppSelector((state) => state.item.selectedItem);

    const sendComment = async () => {
        if (selectedItem && user) {
            const newCommentBody = {
                itemId: selectedItem._id,
                authorId: user._id,
                authorName: user.username,
                authorAvatar: user.avatar,
                text: commentText,
            };
            await createComment(newCommentBody);
            setCommentText('');
        }
    };

    return { sendComment, isNewCommentLoading };
};

export default useCreateComment;
