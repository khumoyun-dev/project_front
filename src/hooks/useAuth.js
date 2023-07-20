import { useEffect } from 'react';
import { useSignInMutation, useSignUpMutation } from '../redux/api/authApiSlice';
import { setLoggedIn, setToken, setUser } from '../redux/slices/userSlice';

import { useAppDispatch } from './useRedux';

const useAuth = (id) => {
    const dispatch = useAppDispatch();

    const [signUp, { data: signUpData, isLoading: isLoadingSignUp, error: signUpError }] = useSignUpMutation('signUp');
    const [signIn, { data: signInData, isLoading: isLoadingSignIn, error: signInError }] = useSignInMutation('signIn');

    const onSignUp = async (formValues) => {
        await signUp(formValues);
    };

    useEffect(() => {
        if (signUpData) {
            dispatch(setUser(signUpData.user));
            dispatch(setToken({ token: signUpData.token, id: signUpData.user._id }));
            dispatch(setLoggedIn(true));
        }
    }, [signUpData]);

    const onSignIn = async (formValues) => {
        await signIn(formValues);
    };

    useEffect(() => {
        if (signInData) {
            dispatch(setUser(signInData.user));
            dispatch(setToken({ token: signInData.token, id: signInData.user._id }));
            dispatch(setLoggedIn(true));
        }
    }, [signInData]);

    const submitForm = async (formValues) => {
        if (id === 'signUp') {
            await onSignUp(formValues);
        } else {
            await onSignIn(formValues);
        }
    };

    const isLoadingAuth = isLoadingSignUp || isLoadingSignIn;

    return {
        submitForm,
        isLoadingAuth,
        signUpErrorMessage: signUpError?.message,
        signInErrorMessage: signInError?.message,
    };
};

export default useAuth;
