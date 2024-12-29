import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { apiConfig, sendServerRequest } from "../../apis";
import { getSelectBongtai, getSelectSkh } from "../../components/Cards/const";
import Input from "../../components/Input";
import MultiSelect from "../../components/MultiSelect";
import MyDragDropUpload from "../../components/MyDragAndDropUpload";
import Select from "../../components/Select";
import Textarea from "../../components/Textarea";
import MaxWidthLayout from "../../layouts/MaxWidthLayout";
import { useAuthStore } from "../../stores/authStore";
import { getImageServer } from "../../utils";
import { bongtais, detus, mocquays, planets, servers, skhs } from "./const";

const schema = yup
    .object()
    .shape({
        price: yup.number().required("Quên nhập giá nè bro."),
        server: yup.string().required("Quên nhập server nè bro."),
        hanh_tinh: yup.string().required("Quên nhập hành tinh nè bro."),
        bong_tai: yup.array(),
        moc_quay: yup.string().required("Quên nhập mốc quay nè bro."),
        de_tu: yup.string().required("Quên nhập đệ tử nè bro."),
        set_kich_hoat: yup.array().min(1, "Quên chọn set kich hoat nè bro."),
        images: yup.array(),
        note: yup.string(),
    })
    .required();
const EditAccount = () => {
    const { id } = useParams();

    const { data = { user: {} } } = useQuery({
        queryKey: ["post", id],
        queryFn: () =>
            sendServerRequest({
                ...apiConfig.getDetailPost,
                endpoint: apiConfig.getDetailPost.endpoint.replace(":id", id || ""),
            }),
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            price: 0,
            server: "",
            hanh_tinh: "",
            bong_tai: [],
            moc_quay: "",
            de_tu: "",
            set_kich_hoat: [],
            images: [],
            note: "",
        },
    });

    useEffect(() => {
        if (data) {
            reset({
                price: data.price || 0,
                server: data.meta?.server || "",
                hanh_tinh: data.meta?.hanh_tinh || "",
                bong_tai: getSelectBongtai(data.meta?.bong_tai || []),
                moc_quay: data.meta?.moc_quay || "",
                de_tu: data.meta?.de_tu || "",
                set_kich_hoat: getSelectSkh(data?.meta?.set_kich_hoat || []),
                images: data.images || [],
                note: data.note || "",
            })
        }
    }, [data])
    const images = watch("images") || [];

    const { user } = useAuthStore();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => {
            return sendServerRequest({
                ...apiConfig.updatePost,
                endpoint: apiConfig.updatePost.endpoint.replace(":id", id || ""),
                body: data,
            });
        },
        onSuccess(data, variables, context) {
            toast.success("Cập nhật nick thành công.");
        },
        onError(error, variables, context) {
            toast.error("Cập nhật nick thất bại.");
        },
    });

    const onSubmit = (data: any) => {
        const payload = {
            ...data,
            meta: {
                set_kich_hoat: data?.set_kich_hoat
                    ?.map((item: any) => item.value)
                    ?.join(","),
                bong_tai: data?.bong_tai?.map((item: any) => item.value)?.join(","),
                server: data.server,
                hanh_tinh: data.hanh_tinh,
                moc_quay: data.moc_quay,
                de_tu: data.de_tu,
            },
        };

        if (user.turn.available <= 0) {
            return toast.error("Bạn đã hết lượt đăng bài, vui lòng mua thêm lượt.");
        }

        mutate(payload);
    };

    return (
        <MaxWidthLayout>
            <div className="border-b border-divide py-4 flex justify-center">
                <span className="text-2xl text-gradient-secondary">Đăng nick mới</span>
            </div>
            <div className="mt-4 flex flex-col gap-2 px-4">
                <div className="flex flex-col gap-2">
                    <span className="text-gradient-primary text-xl">Hình ảnh</span>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            {images?.map((item, index) => (
                                <div className="relative">
                                    <LazyLoadImage key={index} src={getImageServer(item)} className="h-28" />
                                    <div onClick={() => setValue("images", images.filter((i) => i !== item))} className="absolute top-1 right-1 border rounded-full bg-dark1 cursor-pointer hover:opacity-55">
                                        <IoCloseOutline className="text-xl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {images.length < 5 && (
                            <MyDragDropUpload
                                autoReset={true}
                                name="images"
                                onChange={(url) => setValue("images", [...images, url])}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-gradient-primary text-xl">Giá</span>
                    <Input errors={errors} control={control} name="price" type="number" />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-gradient-primary text-xl">Server</span>
                    <Select
                        errors={errors}
                        control={control}
                        name="server"
                        options={servers}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-gradient-primary text-xl">Hành tinh</span>
                    <Select
                        errors={errors}
                        control={control}
                        name="hanh_tinh"
                        options={planets}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-gradient-primary text-xl">Set kích hoạt</span>
                    <MultiSelect
                        errors={errors}
                        control={control}
                        name="set_kich_hoat"
                        options={skhs}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-gradient-primary text-xl">Đệ tử</span>
                    <Select
                        errors={errors}
                        control={control}
                        name="de_tu"
                        options={detus}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-gradient-primary text-xl">Bông tai</span>
                    <MultiSelect
                        errors={errors}
                        name="bong_tai"
                        control={control}
                        options={bongtais}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-gradient-primary text-xl">
                        Mốc quay thượng đế
                    </span>
                    <Select
                        errors={errors}
                        control={control}
                        name="moc_quay"
                        options={mocquays}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-gradient-primary text-xl">Ghi chú</span>
                    <Textarea errors={errors} control={control} name="note" />
                </div>
            </div>

            <div className="mt-8 px-4">
                <button
                    disabled={isPending}
                    onClick={handleSubmit(onSubmit)}
                    className="success-btn w-full"
                >
                    Lưu thay đổi
                </button>
            </div>
        </MaxWidthLayout>
    );
};

export default EditAccount;
