import axios from "axios";
import { TArticle } from "../types/article";

const token = localStorage.getItem("access_token");

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAllArticles = async () => {
  const response = await axiosInstance.get<TArticle[]>("/articles");
  return response;
};

export const createArticle = async (articleData: TArticle) => {
  const response = await axiosInstance.post<TArticle>("/articles", {
    nom_article: articleData.nom_article ?? "",
    quantity: articleData.quantity ?? "",
    isDeleted: false,
  });
  return response;
};

export const updateArticle = async (
  id_article: number,
  articleData: TArticle
) => {
  const response = await axiosInstance.put<TArticle>(
    `/articles/${id_article}`,
    {
      nom_article: articleData.nom_article ?? "",
      quantity: articleData.quantity ?? "",
    }
  );
  return response;
};

export const deleteArticle = async (id_article: number) => {
  const response = await axiosInstance.delete<TArticle>(
    `/articles/${id_article}`
  );
  return response;
};