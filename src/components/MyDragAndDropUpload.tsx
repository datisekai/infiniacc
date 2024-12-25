import React, {
    useLayoutEffect,
    useMemo,
    useState,
    type ComponentProps,
} from "react";
import { sendUploadImage } from "../apis";
import toast from "react-hot-toast";
import { getImageServer } from "../utils";
import { IoMdClose } from "react-icons/io";

type Props = {
    name?: string;
    value?: string;
    onChange?: (e?: string) => void;
    mustValid?: boolean;
    query?: { [key: string]: string };
    autoReset?: boolean
} & ComponentProps<"div">;

const MyDragDropUpload: React.FC<Props> = ({
    query = {},
    mustValid = false,
    value,
    name,
    className,
    onChange = () => { },
    autoReset = false,
    ...rest
}) => {
    const [selectedImage, setSelectedImage] = useState<string>();
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");

    const id = useMemo(() => {
        return `upload-single-image-${Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
            }`;
    }, []);

    useLayoutEffect(() => {
        setSelectedImage(value);
    }, [value]);

    const maxSizeInMB = 2;


    const handleElEvent = (objectUrl: string) => {
        const event = new Event("input", { bubbles: true, cancelable: true });
        const el = document.getElementById(`${name}`) as HTMLInputElement;
        el.value = objectUrl;
        el.dispatchEvent(event);
    };


    const handleFileSelect = (event: any) => {
        const file = event.target.files[0];
        handleFile(file);

    };

    const handleUpload = async (file: any) => {
        const url = await sendUploadImage(file, id);
        if (!url) {
            return toast.error("Tải ảnh lên thất bại.");

        }
        handleElEvent(url);
        onChange?.(url);

        if (autoReset) {
            setSelectedImage("");
            handleElEvent("")
        }
    };

    const handleFile = async (file: any) => {
        if (file) {
            const fileSizeMB = file.size / (1024 * 1024);
            const image = new Image();
            image.src = URL.createObjectURL(file);

            const imageValid = await new Promise((rs, rj) => {
                if (!mustValid) rs(true);
                image.onload = () => {
                    if (image.width <= 400 && image.height <= 400) {
                        rs(true);
                    }
                    rj();
                };
            }).catch((e) => {
                return false;
            });
            if (!file.type.startsWith("image/")) {
                setError("Hãy upload ảnh hợp lệ");
                return;
            } else if (fileSizeMB > maxSizeInMB) {
                setError(`Kích thước ảnh không được lớn hơn ${maxSizeInMB} MB.`);
                return;
            } else if (!imageValid) {
                setError(`Chiều cao và dài tối đa 400x400`);
                return;
            }

            setError("");
            const objectUrl = URL.createObjectURL(file);
            setSelectedImage(objectUrl);
            handleUpload(file);
        }
    };

    const handleDragOver = (event: any) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        handleFile(file);
    };

    return (
        <>
            <input name={name} type="text" className="hidden" id={`${name}`} />
            {/* Upload Area */}
            <div
                {...rest}
                className={`${className} mt-3 overflow-hidden relative max-w-36 h-28 border-2 rounded-xl cursor-pointer transition-all  
                    hover:border-blue-500 hover:bg-dark1 flex justify-center items-center
                    ${isDragging
                        ? "border-blue-500 bg-dark"
                        : "border-primary bg-dark"
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => {
                    if (!selectedImage) {
                        document.getElementById(`${name}_fileInput`)!.click();
                    }
                }}
            >
                <div className="text-center">
                    {selectedImage ? (
                        // Image preview with remove button
                        <>
                            <div className="p-2 relative w-full min-h-full max-h-fit flex items-center justify-center">
                                <img
                                    src={getImageServer(selectedImage)}
                                    alt="Uploaded Preview"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    handleElEvent("");
                                    onChange("");
                                    setSelectedImage("");
                                }}

                                className="absolute right-1 top-1 text-primary"
                            >
                                <IoMdClose />
                            </button>
                        </>
                    ) : (
                        // Placeholder icon and text when no image is uploaded
                        <>
                            <i className="pi pi-plus-circle font-bold" />
                            <p className="text-gray-500 mt-2">Chọn file/Kéo thả vào đây</p>
                        </>
                    )}
                </div>
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                id={`${name}_fileInput`}
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
            />
            {/* Error message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
    );
};

export default MyDragDropUpload;
