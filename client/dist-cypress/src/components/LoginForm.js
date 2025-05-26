import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Button } from './Button';
import { InputField } from './InputField';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/auth.hook';
const LoginForm = ({ onLogin }) => {
    const { register, handleSubmit: handleReactHookFormSubmit, formState, } = useForm();
    const { login, user, error } = useAuth();
    useEffect(() => {
        if (user) {
            onLogin();
        }
    }, [user, onLogin]);
    const handleSubmit = handleReactHookFormSubmit(({ email, password }) => {
        login(email, password);
    });
    return (_jsxs("div", { className: "flex flex-col gap-4 w-[380px]", children: [_jsx("h5", { className: "text-xl", children: "Login" }), _jsxs("form", { noValidate: true, className: "flex flex-col gap-4", onSubmit: handleSubmit, children: [_jsx(InputField, { label: "Email", "data-cy": "email", expand: "full", type: "email", errorMessage: formState.errors.email?.message, ...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Email is not valid',
                            },
                        }) }), _jsx(InputField, { label: "Password", "data-cy": "password", expand: "full", type: "password", errorMessage: formState.errors.password?.message, ...register('password', {
                            required: 'Password is required',
                        }) }), error && _jsx("div", { className: "text-red-500", children: error }), _jsx(Button, { expand: "full", children: "Sign in" })] })] }));
};
export default LoginForm;
