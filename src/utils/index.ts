import { BASE_URL } from "../constants";

export function randomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function getRandomAvatar(url?: string) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${
    url || "Infiniacc"
  }`;
}

export function generateCharacter(index: number) {
  return String.fromCharCode(65 + index);
}

export function zeroPad(n: string, width: number, z?: string) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export const getPastDate = (space?: number) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - (space || 0));
  return currentDate;
};

export const getIndex = (index: number, rowPerPage: number, page: number) => {
  return (page - 1) * rowPerPage + (index + 1);
};

export function getImageServer(url: string) {
  if (url?.includes("uploads/")) return `${BASE_URL}/${url}`;
  return url;
}

export const formatCash = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export * from "./local-store";

export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(currency);
};

export function slugify(input: string) {
  if (!input) return "";

  // make lower case and trim
  var slug = input?.toLowerCase().trim();

  // remove accents from charaters
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // replace invalid chars with spaces
  slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim();

  // replace multiple spaces or hyphens with a single hyphen
  slug = slug.replace(/[\s-]+/g, "-");

  return slug;
}

export function time_ago(time: any) {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, "giây", 1], // 60
    [120, "1 phút trước", "1 phút kể từ bây giờ"], // 60*2
    [3600, "phút", 60], // 60*60, 60
    [7200, "1 giờ trước", "1 giờ kể từ bây giờ"], // 60*60*2
    [86400, "giờ", 3600], // 60*60*24, 60*60
    [172800, "hôm qua", "hôm qua"], // 60*60*24*2
    [604800, "ngày", 86400], // 60*60*24*7, 60*60*24
    [1209600, "tuần trước", "tuần sau"], // 60*60*24*7*4*2
    [2419200, "tuần", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "tháng trước", "tháng sau"], // 60*60*24*7*4*2
    [29030400, "tháng", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "năm trước", "năm sau"], // 60*60*24*7*4*12*2
    [2903040000, "năm", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
    [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = "trước",
    list_choice = 1;

  if (seconds == 0) {
    return "Ngay bây giờ";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "kể từ bây giờ";
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    if (+seconds < +format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
}

export const parsePriceRange = (
  value: string
): { priceFrom: number; priceTo?: number } => {
  const payload: { priceFrom: number; priceTo?: number } = { priceFrom: 0 };

  switch (value) {
    case "duoi-200k":
      payload.priceFrom = 0;
      payload.priceTo = 200000;
      break;
    case "200k-500k":
      payload.priceFrom = 200000;
      payload.priceTo = 500000;
      break;
    case "500k-1tr":
      payload.priceFrom = 500000;
      payload.priceTo = 1000000;
      break;
    case "tren-1tr":
      payload.priceFrom = 1000000;
      break;
    default:
      throw new Error("Invalid price range value");
  }

  return payload;
};

export const getPriceRangeValue = (priceFrom: number, priceTo?: number) => {
  if (priceFrom === 0 && priceTo === 200000) {
    return "duoi-200k";
  }
  if (priceFrom === 200000 && priceTo === 500000) {
    return "200k-500k";
  }
  if (priceFrom === 500000 && priceTo === 1000000) {
    return "500k-1tr";
  }
  if (priceFrom === 1000000 && priceTo === undefined) {
    return "tren-1tr";
  }

  if ((priceFrom = 0 && priceTo == 0)) return "";
};

export const translateQuery = (query: any) => {
  const newQuery: any = {};
  for (const key in query) {
    if (
      typeof query[key] === "object" &&
      query[key] &&
      query[key]?.length > 0
    ) {
      newQuery[key] = query[key]?.join(",");
    }
    if (
      (typeof query[key] === "string" || typeof query[key] === "number") &&
      query[key]
    ) {
      newQuery[key] = query[key];
    }
  }
  return newQuery;
};
