import {
  SigninValidation,
  SignupValidation,
} from "@ronit-ghosh/daily-muse-common";
import axios, { isAxiosError } from "axios";
import { atom, atomFamily, selectorFamily } from "recoil";
import URL from "../config/config";

export const checkAuthAtom = atom({
  key: "checkAuthAtom",
  default: false,
});

export const signupAtom = atom<SignupValidation>({
  key: "signupAtom",
  default: {
    email: "",
    password: "",
    username: "",
    firstname: "",
    lastname: "",
    bio: "",
  },
});

export const signinAtom = atom<SigninValidation>({
  key: "signinAtom",
  default: {
    email: "",
    password: "",
  },
});

export const fetchBlogsBulk = atomFamily({
  key: "fetchBlogBulk",
  default: selectorFamily({
    key: "bulkFetch",
    get: (page) => async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/blog/bulk`, {
          params: { page, limit: 5 },
        });
        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          return error.response?.data;
        }
      }
    },
  }),
});

export const fetchBlog = atomFamily({
  key: "fetchBlog",
  default: selectorFamily({
    key: "fetchBlogById",
    get: (id: string) => async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/blog/${id}`);
        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          return error.response?.data;
        }
      }
    },
  }),
});

export const fetchUserBlogs = atomFamily({
  key: "fetchUserBlogs",
  default: selectorFamily({
    key: "fetchUserBlogsByUsername",
    get: (username: string) => async () => {
      try {
        const token = localStorage.getItem('dailymuse')
        const response = await axios.get(`${URL}/api/v1/blog/user/blogs/${username}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
      } catch (error) {
        if (isAxiosError(error)) {
          return (error.response?.data.msg);
        }
      }
    }
  })
})
