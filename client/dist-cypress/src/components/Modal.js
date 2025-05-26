import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './Modal.scss';
const Modal = ({ open, onClose, component }) => {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        setShowModal(open);
    }, [open]);
    if (!open) {
        return null;
    }
    const close = () => {
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 150);
    };
    return (_jsx("div", { children: _jsx("div", { className: `${showModal ? 'open' : ''} modal-container fixed flex flex-col justify-center items-center top-0 left-0 insert-0 overflow-y-auto h-full w-full`, onMouseDown: close, children: _jsx("div", { className: `${showModal ? 'open' : ''} modal p-8 border shadow-lg rounded-md bg-white relative`, onMouseDown: (e) => e.stopPropagation(), children: component }) }) }));
};
export default Modal;
