import React, { memo, useEffect } from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { closeModal } from '../../redux/slices/modalAuthSlice';

import { defaultUserFormValues, emailValidation } from '../../utils/constants';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

import ValidationError from './ValidationError';

function AuthForm({ submitForm, isInputDisabled, isButtonDisabled }) {
    const id = useAppSelector((state) => state.authModal.id);
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const {
        register,
        handleSubmit,
        clearErrors,
        setFocus,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: defaultUserFormValues,
    });

    useEffect(() => {
        if (id === 'signUp') {
            setFocus('username');
        } else {
            setFocus('email');
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            reset();
            dispatch(closeModal());
            navigate('/profile');
        }
    }, [isLoggedIn]);

    return (
        <Form aria-label="form" noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
            {id === 'signUp' && (
                <Form.Group className="mb-3 form-group" controlId={`${id}formUsername`}>
                    <Form.Label>{t('username')}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={t('usernamePlaceholder')}
                        {...register('username', {
                            required: true,
                            minLength: 2,
                            maxLength: 50,
                            onChange: () => errors && clearErrors('username'),
                        })}
                        disabled={isInputDisabled}
                    />
                    {errors.username && <ValidationError errors={errors} field="username" />}
                </Form.Group>
            )}
            <Form.Group className="mb-3 form-group" controlId={`${id}formEmail`}>
                <Form.Label>{t('email')}</Form.Label>
                <Form.Control
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    {...register('email', {
                        required: true,
                        minLength: 2,
                        maxLength: 50,
                        pattern: emailValidation,
                        onChange: () => errors && clearErrors('email'),
                    })}
                    disabled={isInputDisabled}
                />
                {errors.email && <ValidationError errors={errors} field="email" />}
            </Form.Group>
            <Form.Group className="mb-3 form-group" controlId={`${id}formPassword`}>
                <Form.Label>{t('password')}</Form.Label>
                <Form.Control
                    type="password"
                    placeholder={t('password')}
                    {...register('password', {
                        required: true,
                        minLength: 2,
                        maxLength: 50,
                        onChange: () => errors && clearErrors('password'),
                    })}
                    disabled={isInputDisabled}
                />
                {errors.password && <ValidationError errors={errors} field="password" />}
            </Form.Group>
            <ButtonToolbar className="justify-content-sm-end justify-content-center gap-2 mt-5 mb-3">
                <Button className="secondary-button" onClick={() => dispatch(closeModal())}>
                    {t('cancelButton')}
                </Button>
                <Button className="primary-button" type="submit" disabled={isButtonDisabled}>
                    {t('submitButton')}
                </Button>
            </ButtonToolbar>
        </Form>
    );
}

export default memo(AuthForm);
