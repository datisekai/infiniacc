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
  if (url.includes("uploads/")) return `${BASE_URL}/${url}`;
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
