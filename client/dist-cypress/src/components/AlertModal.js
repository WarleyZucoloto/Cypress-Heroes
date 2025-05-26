import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './Button';
export const AlertModal = ({ children, onDismiss, }) => {
    return (_jsxs("div", { className: "flex flex-col gap-4 text-center", children: [_jsx("div", { className: "flex flex-col items-center text-sm text-gray-500", children: _jsx("h5", { className: "mb-1 text-xl font-medium text-gray-500", children: children }) }), _jsx("div", { className: "flex gap-2 justify-end", children: _jsx(Button, { color: "outline", onClick: onDismiss, children: "Ok" }) })] }));
};
