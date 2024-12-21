import React from 'react'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import MaxWidthLayout from '../../layouts/MaxWidthLayout'
import { bongtais, detus, mocquays, planets, servers, skhs } from './const'
import MultiSelect from '../../components/MultiSelect'

const EditAccount = () => {
    return (
        <MaxWidthLayout>
            <div className='border-b border-divide py-4 flex justify-center'>
                <span className='text-2xl text-gradient-secondary'>Cập nhật nick #123</span>
            </div>
            <div className='mt-4 flex flex-col gap-2 px-4'>
                <div className='flex flex-col gap-2'>
                    <span className='text-gradient-primary text-xl'>Giá</span>
                    <Input type='number' />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-gradient-primary text-xl'>Server</span>
                    <Select options={servers} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-gradient-primary text-xl'>Hành tinh</span>
                    <Select options={planets} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-gradient-primary text-xl'>Set kích hoạt</span>
                    <MultiSelect options={skhs} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-gradient-primary text-xl'>Đệ tử</span>
                    <Select options={detus} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-gradient-primary text-xl'>Bông tai</span>
                    <MultiSelect options={bongtais} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-gradient-primary text-xl'>Mốc quay thượng đế</span>
                    <Select options={mocquays} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-gradient-primary text-xl'>Ghi chú</span>
                    <Textarea />
                </div>
            </div>

            <div className='mt-8 px-4'>
                <button className='success-btn w-full'>Lưu thay đổi </button>
            </div>
        </MaxWidthLayout>
    )
}

export default EditAccount