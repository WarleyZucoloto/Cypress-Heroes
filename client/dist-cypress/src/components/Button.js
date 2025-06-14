import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
export const Button = ({ color = 'primary', expand = 'inline-block', focus, children, className, ...props }) => {
    const buttonRef = useRef(null);
    useEffect(() => {
        if (focus && buttonRef.current) {
            buttonRef.current && buttonRef.current.focus();
        }
    }, [focus]);
    const getClassNames = () => {
        let styles = 'items-center py-2 px-4 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none';
        switch (color) {
            case 'primary':
                styles +=
                    ' text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300';
                break;
            case 'secondary':
                styles +=
                    ' text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300';
                break;
            case 'danger':
                styles += ' text-white bg-red-600 hover:bg-red-700 focus:ring-red-300';
                break;
            case 'outline':
                styles +=
                    ' text-gray-800 bg-gray-200/10 hover:bg-gray-200/75 focus:ring-gray-300 border border-gray-300';
        }
        if (expand === 'full') {
            styles += ' w-full';
        }
        return className + ' ' + styles;
    };
    return (_jsx("button", { ref: buttonRef, className: getClassNames(), ...props, children: children }));
};
