import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useChangeRoute from "../hooks/useChangeRoute";
import { useMutation } from "@tanstack/react-query";
import { apiConfig, sendServerRequest } from "../apis";
import { pathNames } from "../constants";
import toast from "react-hot-toast";
import MaxWidthLayout from "../layouts/MaxWidthLayout";
import Textarea from "../components/Textarea";

const schema = yup
    .object()
    .shape({
        content: yup.string().required("Quên nhập content nè bro."),
    })
    .required();
const Feedback = () => {
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
            content: "",
        },
    });


    const { changeView } = useChangeRoute();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => {
            return sendServerRequest({
                ...apiConfig.createFeedback,
                body: data,
            });
        },
        onSuccess(data, variables, context) {
            changeView(pathNames.home);
            toast.success(" Phản hồi của bạn đã được gửi thành công tới hệ thống. Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.  ", {
                duration: 7000
            });
        },
        onError(error, variables, context) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        },
    });

    const onSubmit = (data: any) => {
        mutate(data);
    };

    return (
        <MaxWidthLayout>
            <div className="border-b border-divide py-4 flex justify-center">
                <span className="text-2xl text-gradient-secondary">Gửi góp ý của bạn</span>
            </div>
            <div className="mt-4 flex flex-col gap-2 px-4">
                <div className="flex flex-col gap-2">
                    <span className="text-gradient-primary text-xl">Nội dung</span>
                    <Textarea errors={errors} control={control} name="content" />
                </div>
            </div>

            <div className="mt-8 px-4">
                <button
                    disabled={isPending}
                    onClick={handleSubmit(onSubmit)}
                    className="success-btn w-full"
                >
                    Gửi góp ý
                </button>
            </div>
        </MaxWidthLayout>
    );
};

export default Feedback;
