import React, { useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'
import useChangeRoute from '../hooks/useChangeRoute'
import { pathNames } from '../constants'

type Props = {
    children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({ children }) => {
    const { token } = useAuthStore()
    const { changeView } = useChangeRoute()

    return (
        <>
            {token ? children : <div className='h-full flex flex-col gap-2 items-center justify-center'>
                <p>Bạn cần đăng nhập để xem.</p>
                <button className='success-btn' onClick={() => changeView(pathNames.login)}>Đăng nhập ngay</button>
            </div>}
        </>
    )
}

export default AuthLayout