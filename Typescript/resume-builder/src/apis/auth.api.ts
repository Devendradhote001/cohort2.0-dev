import axios from "axios";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerApi = async (
  payload: RegisterPayload
) => {
  const response = await axios.post(
    "/api/auth/register",
    payload
  );

  return response.data;
};

export const loginApi = async (
  payload: LoginPayload
) => {
  const response = await axios.post(
    "/api/auth/login",
    payload
  );

  return response.data;
};