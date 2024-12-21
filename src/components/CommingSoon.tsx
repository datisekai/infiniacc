import React from 'react'
import useChangeRoute from '../hooks/useChangeRoute'
import { pathNames } from '../constants/pathname'

const CommingSoon = () => {
    const { changeView } = useChangeRoute()
    return (
        <div className='w-full px-4 h-full flex flex-col items-center justify-center'>
            <div className='text-gradient-primary text-center text-2xl'>Chúng tôi sẽ sớm ra mắt trang web này. </div>
            <div className='flex justify-center mt-4'>
                <button className='success-btn' onClick={() => changeView(pathNames.home)}>Trở lại trang chủ</button>
            </div>
        </div>
    )
}

export default CommingSoon