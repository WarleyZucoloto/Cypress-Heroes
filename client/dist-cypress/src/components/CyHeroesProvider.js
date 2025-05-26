import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import Modal from './Modal';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CyHeroesContext = React.createContext({});
const CyHerosProvider = ({ children }) => {
    const [modal, setModal] = useState();
    const [user, setUser] = useState();
    return (_jsxs(CyHeroesContext.Provider, { value: { modal, setModal, user, setUser }, children: [children, _jsx(Modal, { component: modal, open: !!modal, onClose: () => setModal(undefined) })] }));
};
export default CyHerosProvider;
