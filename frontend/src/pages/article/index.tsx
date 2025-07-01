import { useEffect, useState } from "react";
import { getAllArticles } from "../../service/ArticleService";
import { TArticle } from "../../types/article";
import { Article } from "../../components/ArticleComponents/Article";
import { useNavigate } from "react-router-dom";

export const ArticlePage = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const [articles, setArticles] = useState<Array<TArticle>>([]);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      getAllArticles().then((res) => {
        if (res.data.length) {
          setArticles([...res.data]);
        } else setArticles([]);
      });
    }
  }, [navigate, token]);

  return <Article articles={articles ?? []} />;
};