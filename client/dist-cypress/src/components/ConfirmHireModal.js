import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from './Avatar';
import { Button } from './Button';
export const ConfirmHireModal = ({ hero, onHire, onDismiss, }) => {
    return (_jsxs("div", { className: "flex flex-col gap-4 text-center", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "Hire Hero?" }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Hire this hero for ", hero.price, "?"] }), _jsxs("div", { className: "flex flex-col items-center text-sm text-gray-500", children: [_jsx(Avatar, { className: "text-center", hero: hero }), _jsx("h5", { className: "mb-1 text-xl font-medium text-gray-500", children: hero.name })] }), _jsxs("div", { className: "flex gap-2 justify-end", children: [_jsx(Button, { color: "danger", onClick: onHire, children: "Yes" }), _jsx(Button, { color: "outline", onClick: onDismiss, children: "No" })] })] }));
};
