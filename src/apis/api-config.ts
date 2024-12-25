export const apiConfig = {
  uploadImage: {
    method: "POST",
    endpoint: "/api.upload/image",
  },
  loginGoogle: {
    method: "GET",
    endpoint: "/api.auth/google-login",
  },
  getMe: {
    method: "GET",
    endpoint: "/api.auth/profile",
  },
  updateProfile: {
    method: "PUT",
    endpoint: "/api.user/me",
  },
  createPost: {
    method: "POST",
    endpoint: "/api.post",
  },
  updatePost: {
    method: "PUT",
    endpoint: "/api.post/:id",
  },
  getPost: {
    method: "GET",
    endpoint: "/api.post",
  },
  getDetailPost: {
    method: "GET",
    endpoint: "/api.post/:id",
  },
};
