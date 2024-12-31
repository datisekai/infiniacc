import { bongtais, skhs } from "../../pages/Account/const";

export const translateMocQuay = (moc_quay: string) => {
  switch (moc_quay) {
    case "0k_5k":
      return "0k - 5k";
    case "5k_10k":
      return "5k - 10k";
    case "10k":
      return "10k";
    default:
      return "--";
  }
};

export const translateBongTai = (bong_tai: string) => {
  switch (bong_tai) {
    case "1":
      return "Cấp 1";
    case "2":
      return "Cấp 2";
    case "3":
      return "Cấp 3";
    default:
      return "--";
  }
};

export const translateDeTu = (de_tu: string) => {
  switch (de_tu) {
    case "normal":
      return "Đệ thường";
    case "mabu":
      return "Đệ Mabu";
    case "broly":
      return "Đệ Broly";
    default:
      return "--";
  }
};

export const getSelectSkh = (skh: string[]) => {
  let skh_handle = skh;
  if (!skh || skh?.length == 0) return [];
  if (typeof skh === "string") {
    skh_handle = (skh as any)?.split(",");
  }
  return skh_handle?.map((item) => {
    const value = skhs.find((skh) => skh?.value == item);
    return {
      value: value?.value,
      label: value?.label,
    };
  });
};
