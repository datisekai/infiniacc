import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import BorderGradient from '../components/BorderGradient';

type ConfirmParams = {
    title?: string;
    message?: string;
    onAccept?: () => void
}

const useConfirm = () => {
    const confirm = (data: ConfirmParams) => {
        const { title = "Xác nhận", message = "Bạn có chắc chắn muốn xoá?", onAccept = () => { } } = data;
        return confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <BorderGradient active={true}>
                        <div className='p-6'>
                            <h1 className='text-gradient-primary text-xl inline'>{title}</h1>
                            <p>{message}</p>
                            <div className='flex justify-end gap-4 mt-6'>
                                <button onClick={onClose}>Thoát</button>
                                <button onClick={async () => {
                                    await onAccept();
                                    onClose()
                                }} className='danger-btn'>Xác nhận</button>
                            </div>
                        </div>
                    </BorderGradient>

                );
            },
            overlayClassName: "confirm-overlay"
        });
    }

    return { confirm }
}

export default useConfirm