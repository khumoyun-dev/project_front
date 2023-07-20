import { useEffect } from 'react';
import { useDeleteCommentByIdMutation } from '../redux/api/commentApiSlice';
import useGetAllComments from './useGetAllComments';

const useDeleteComment = (commentId) => {
    const [deleteCommentById, { data: deletedComment, isSuccess: isSuccessDeleteComment }] =
        useDeleteCommentByIdMutation();
    const { getAllComments } = useGetAllComments();

    const deleteComment = async () => {
        await deleteCommentById(commentId);
    };

    useEffect(() => {
        if (deletedComment && isSuccessDeleteComment) {
            (async () => {
                await getAllComments();
            })();
        }
    }, [deletedComment, isSuccessDeleteComment]);

    return { deleteComment };
};

export default useDeleteComment;
