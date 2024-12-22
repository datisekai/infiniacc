import React from 'react'
import Input from '../components/Input'
import MaxWidthLayout from '../layouts/MaxWidthLayout'

const Profile = () => {
    return (
        <MaxWidthLayout padding={"16px 0px"}>
            <div className='flex flex-col gap-4 px-4'>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg md:text-2xl text-gradient-primary'>Số điện thoại</span>
                    <Input />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg md:text-2xl text-gradient-primary'>Số Zalo</span>
                    <Input />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg md:text-2xl text-gradient-primary'>Link Messenger</span>
                    <Input />
                </div>
                <div className='mt-8 flex justify-center'>
                    <button className='success-btn w-full'>Lưu thay đổi</button>
                </div>
            </div>
        </MaxWidthLayout>
    )
}

export default Profile