import axios from "axios";
import { LOGIN_URL } from "../constants/loginUrlConstants";

export const userLoginAction = async ({ email, password }) => {
  try {
    const res = await axios.post(LOGIN_URL, { email, password });
    if (res.status == 200) {
      return {
        status: true,
        token: res.data.data.token,
        user: res.data.data.user,
      }
    } else {
      return { status: false };
    }
  } catch (err) {
    console.error("Login failed", err);
    return { status: false, message: "Login Failed !!" };
  }
};
