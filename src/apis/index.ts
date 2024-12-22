export * from "./api-config";

import { axiosInstance } from "../plugins/axios";
import { useCommonStore } from "../stores/commonStore";
import { apiConfig } from "./api-config";

export const processMiddlewareSendRequest = async ({
  endpoint = "",
  method = "GET",
  body = {},
}) => {
  try {
    useCommonStore.getState().setLoading(true);
    const resp = await sendServerRequest({
      endpoint,
      method,
      body,
    });
    return resp;
  } catch (error) {
    throw error;
  } finally {
    useCommonStore.getState().setLoading(false);
  }
};

export const sendServerRequest = async ({
  endpoint = "",
  method = "",
  body = {},
}) => {
  try {
    const resp = await axiosInstance.request({
      url: endpoint,
      method,
      ...{
        [method === "GET" ? "params" : "data"]: body,
      },
    });

    if (!resp.data) throw resp;
    return resp.data;
  } catch (error) {
    throw error;
  }
};
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
interface SendFormDataParams {
  endpoint: string;
  method: HttpMethod;
  body: FormData | Record<string, any>;
}
export const sendFormData = async ({
  endpoint = "",
  method = "POST",
  body,
}: SendFormDataParams) => {
  try {
    const resp = await axiosInstance.request({
      url: endpoint,
      method,
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!resp.data) throw resp;
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const sendUploadImage = async (file: File, id?: string) => {
  try {
    id && useCommonStore.getState().setLoadingUpload(id, true);

    const formData = new FormData();
    formData.append("file", file);
    const response = await sendFormData({
      body: formData,
      endpoint: apiConfig.uploadImage.endpoint,
      method: apiConfig.uploadImage.method as HttpMethod,
    });
    return response.filePath;
  } catch (error) {
    console.log(error);
    return "";
  } finally {
    id && useCommonStore.getState().setLoadingUpload(id, false);
  }
};
