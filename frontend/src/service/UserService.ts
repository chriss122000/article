import axios from "axios";
import { TAccessToken, TUser } from "../types/user";

const api = process.env.REACT_APP_BACKEND_API_URL;

export const onLoginUser = async (userData: TUser) => {
  const response = await axios.post<TAccessToken>(`${api}/auth/login`, {
    username: userData.username ?? "",
    password: userData.password ?? "",
  });
  return response;
};

export const onCreateUser = async (userData: TUser) => {
  const response = await axios.post<TUser>(`${api}/user`, {
    username: userData.username ?? "",
    password: userData.password ?? "",
  });
  return response;
};

export const checkIfUserExist = async (username: string) => {
  const response = await axios.get<TUser>(`${api}/user/${username}`);
  return response;
};