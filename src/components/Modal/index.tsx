import { useState, useEffect, ReactNode } from 'react';
import ReactModal from 'react-modal';

interface Props {
    isOpen: boolean;
    setIsOpen: () => void;
    children: ReactNode;
}

export function Modal({ isOpen, children }: Props) {
    const [modalStatus, setModalStatus] = useState(isOpen);

    return (
        <ReactModal
            isOpen={modalStatus}
            onRequestClose={() => { }}
            ariaHideApp={false}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#F0F0F5',
                    color: '#000000',
                    borderRadius: '8px',
                    width: '736px',
                    border: 'none',
                },
                overlay: {
                    backgroundColor: '#121214e6',
                },
            }}
        >
            {children}
        </ReactModal>
    );
}