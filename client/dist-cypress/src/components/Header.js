import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';
import { useModal } from '../hooks/modal.hook';
import { Button } from './Button';
import LoginForm from './LoginForm';
const Header = () => {
    const { setModal } = useModal();
    const { user, logout } = useAuth();
    return (_jsx("header", { className: "text-gray-500", children: _jsxs("div", { className: "flex justify-between max-w-6xl", children: [_jsx("div", { children: _jsx(Link, { to: "/", children: _jsx("img", { src: "/images/cyheroes-logo.svg", alt: "Cypress Heroes Logo" }) }) }), _jsx("nav", { children: _jsxs("ul", { className: "flex gap-8", children: [user && user.isAdmin && (_jsx("li", { children: _jsx(Link, { to: "/heroes/new", children: _jsx(Button, { color: "primary", children: "Create New Hero" }) }) })), _jsx("li", { children: user ? (_jsx(Button, { color: "outline", onClick: logout, children: "Logout" })) : (_jsx(Button, { color: "outline", onClick: () => {
                                        setModal(_jsx(LoginForm, { onLogin: () => setModal(undefined) }));
                                    }, children: "Login" })) })] }) })] }) }));
};
export default Header;
