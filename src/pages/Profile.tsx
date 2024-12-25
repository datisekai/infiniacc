import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import MaxWidthLayout from '../layouts/MaxWidthLayout'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useMutation } from '@tanstack/react-query'
import { apiConfig, sendServerRequest } from '../apis'
import toast from 'react-hot-toast'

const schema = yup
    .object()
    .shape({
        username: yup.string().required("Quên nhập username nè bro."),
        note: yup.string().required("Quên nhập note nè bro."),
        phone: yup.string(),
        zalo: yup.string(),
        email: yup.string().required("Quên nhập email nè bro."),
        messenger: yup.string(),
    })
    .required();

const Profile = () => {
    const { user, setUser } = useAuthStore()
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            note: '',
            phone: '',
            zalo: '',
            email: '',
            messenger: '',
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => {
            return sendServerRequest({
                ...apiConfig.updateProfile,
                body: data
            })
        },
        onSuccess(data, variables, context) {
            setUser(data);
            toast.success("Cập nhật thông tin thành công.")
        },
        onError(error, variables, context) {
            toast.error("Cập nhật thông tin thất bại.")
        },
    })

    useEffect(() => {
        reset({
            email: user.email,
            messenger: user?.contact?.messenger || "",
            note: user.note || "",
            phone: user?.contact?.phone || "",
            username: user.username || "",
            zalo: user?.contact?.zalo || "",
        })
    }, [user])
    const onSubmit: SubmitHandler<any> = (data) => {
        const payload = { ...data, contact: { phone: data.phone || "", zalo: data.zalo || "", messenger: data.messenger || "" } };
        mutate(payload)
    }
    return (
        <MaxWidthLayout padding={"16px 0px"}>
            <div className='flex flex-col gap-4 px-4'>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg md:text-2xl text-gradient-primary'>Email</span>
                    <Input control={control} errors={errors} name={'email'} readOnly={true} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg md:text-2xl text-gradient-primary'>Username</span>
                    <Input control={control} errors={errors} name={'username'} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg md:text-2xl text-gradient-primary'>Tiểu sử</span>
                    <Textarea name='note' control={control} errors={errors} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg md:text-2xl text-gradient-primary'>Số điện thoại</span>
                    <Input control={control} errors={errors} name={'phone'} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg md:text-2xl text-gradient-primary'>Số Zalo</span>
                    <Input control={control} errors={errors} name={'zalo'} />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg md:text-2xl text-gradient-primary'>Link Facebook/Messenger</span>
                    <Input control={control} errors={errors} name={'messenger'} />
                </div>
                <div className='mt-8 flex justify-center'>
                    <button disabled={isPending} onClick={handleSubmit(onSubmit)} className='success-btn w-full'>Lưu thay đổi</button>
                </div>
            </div>

        </MaxWidthLayout>
    )
}

export default Profile