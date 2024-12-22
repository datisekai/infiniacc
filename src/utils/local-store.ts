export const setObjectLocalData = (key: string, data: any, type = "local") => {
  if (type === "local") {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  if (type === "session") {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }
};

export const getObjectLocalData = (key: string, type = "local") => {
  let jsonData;
  if (type === "local") {
    jsonData = window.localStorage.getItem(key);
  }

  if (type === "session") {
    jsonData = window.sessionStorage.getItem(key);
  }

  if (jsonData) {
    try {
      return JSON.parse(jsonData);
    } catch {
      return undefined;
    }
  }
  return undefined;
};

export const setStringLocalData = (key: string, value: any) => {
  window.localStorage.setItem(key, value);
};

export const getStringLocalData = (key: string) => {
  return window.localStorage.getItem(key);
};

export const removeLocalItem = (key: string, type = "local") => {
  if (type === "local") {
    window.localStorage.removeItem(key);
  }

  if (type === "session") {
    window.sessionStorage.removeItem(key);
  }
};
