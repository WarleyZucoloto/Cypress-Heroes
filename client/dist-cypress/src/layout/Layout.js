import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from '../components/Header';
const Layout = ({ children }) => {
    return (_jsxs("div", { className: "max-w-5xl p-4 mx-auto", children: [_jsx(Header, {}), _jsx("div", { className: "mt-8", children: children })] }));
};
export default Layout;
