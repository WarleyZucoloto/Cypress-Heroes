import { jsx as _jsx } from "react/jsx-runtime";
export const Avatar = ({ className, hero }) => {
    return (_jsx("div", { className: `${className}  `, children: _jsx("img", { className: `w-24 h-24 rounded-full`, src: hero.avatarUrl || '/images/empty-avatar.webp', alt: hero.name }) }));
};
