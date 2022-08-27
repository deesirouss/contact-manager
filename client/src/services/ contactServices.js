import { authHeader } from "./authHeaderServices";
import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = "http://localhost:5000";

export const getContacts = async () => {
  const res = await axiosInstance.get("/contacts");
  return res;
};

export const getContactObj = async (id) => {
  const res = await axiosInstance.get("/contacts/" + id);
  // console.log(res);
  return res;
};

export const create = async (
  name,
  phone,
  email,
  address,
  fav,
  image
) => {
  const res = await axiosInstance.post("/contacts", {
    name,
    phone,
    email,
    address,
    fav,
    image,
  });
  return res;
};

export const update = async (id, data) => {
  const res = await axiosInstance.put("/contacts/" + id, data);
  return res;
};

export const remove = async (id) => {
  console.log("id",id)
  const res = await axiosInstance.delete("/contacts/" + id, id);
  return res;
};

export const getToken = async (token) => {
  return await axios.post(API_URL + "/auth/login", token, { headers: "*" });
};
