import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export const SelectField = React.forwardRef(({ errorMessage, label, children, ...props }, ref) => {
    return (_jsxs("div", { children: [_jsxs("label", { className: "block mb-2 text-sm font-medium text-gray-500", children: [label, _jsx("select", { ...props, ref: ref, "data-cy": `${props.name}Select`, className: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5', children: children })] }), errorMessage && _jsx("div", { className: "text-red-500", children: errorMessage })] }));
});
