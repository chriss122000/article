import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { TArticle } from "../../types/article";
import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import {
  createArticle,
  deleteArticle,
  updateArticle,
} from "../../service/ArticleService";
import { InputText } from "../Common/InputText";
import { DialogConfirm } from "../Common/DialogConfirm";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { colorVariable } from "../../utils/colorVariable";
import { GridView } from "./GridView";
import { ListView } from "./ListView";
import { toast } from "react-toastify";

interface IArticleProps {
  articles: Array<TArticle>;
}

export const Article: React.FC<IArticleProps> = ({ articles }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialArticleState: TArticle = {
    id_article: 0,
    nom_article: "",
    quantity: 0,
    isDeleted: false,
  };

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isGridView, setIsGridView] = useState<boolean>(false);
  const [articleState, setArticleState] = useState<TArticle>({
    ...initialArticleState,
  });
  const [articleProvider, setArticleProvider] = useState<Array<TArticle>>([
    ...articles,
  ]);

  useEffect(() => {
    setArticleProvider([...articles]);
  }, [articles]);

  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = ev.target;
      setArticleState({ ...articleState, [name]: value });
    },
    [articleState]
  );

  const onSave = useCallback(() => {
    if (articleState.id_article === 0) {
      createArticle({ ...articleState }).then((res) => {
        if (res.status === 200) {
          setArticleProvider([res.data, ...articleProvider]);
          setArticleState({ ...initialArticleState });
          toast("Article créé avec succès", { type: "success" });
        } else {
          toast("Une erreur c'est produit lors de la création d'un article", {
            type: "error",
          });
        }
      });
    } else {
      updateArticle(articleState.id_article, { ...articleState }).then(
        (res) => {
          if (res.status === 200) {
            setArticleProvider([
              res.data,
              ...articleProvider.filter(
                (article) => article.id_article !== articleState.id_article
              ),
            ]);
            setArticleState({ ...initialArticleState });
            toast("Article modifié avec succès", { type: "success" });
          } else {
            toast(
              "Une erreur c'est produit lors de la modification d'un article",
              {
                type: "error",
              }
            );
          }
        }
      );
    }
  }, [articleState, articleProvider, initialArticleState]);

  const onEdit = useCallback(
    (article: any) => (ev: any) => {
      setArticleState({ ...article });
    },
    []
  );

  const onCancel = useCallback(() => {
    setArticleState({ ...initialArticleState });
  }, [initialArticleState]);

  const onHandleDialog = useCallback(
    (id_article?: number) => (ev: any) => {
      setIsDialogOpen(!isDialogOpen);
      if (id_article) {
        setArticleState({ ...articleState, id_article: id_article });
      } else setArticleState({ ...initialArticleState });
    },
    [isDialogOpen, initialArticleState, articleState]
  );

  const onDelete = useCallback(() => {
    if (articleState.id_article) {
      deleteArticle(articleState.id_article).then((res) => {
        if (res.status === 200) {
          setArticleProvider(
            articleProvider.filter(
              (article) => article.id_article !== res.data.id_article
            )
          );
          setArticleState({ ...initialArticleState });
          setIsDialogOpen(false);
          toast("Article supprimé avec succès", { type: "success" });
        } else {
          toast(
            "Une erreur c'est produit lors de la suppression d'un article",
            {
              type: "error",
            }
          );
        }
      });
    }
  }, [articleProvider, articleState.id_article, initialArticleState]);

  const setIsViewAsGrid = useCallback(() => {
    setIsGridView(true);
  }, []);

  const setIsViewAsList = useCallback(() => {
    setIsGridView(false);
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} mx={10} mt={10}>
      <DialogConfirm
        title="Supprimer un article"
        text={`Voulez-vous vraiment supprimer cet article avec l'id = ${articleState.id_article} ?`}
        isOpen={isDialogOpen}
        onConfirm={onDelete}
        onCancel={onHandleDialog}
      />
      <Box component={Paper} padding={2}>
        <Typography
          color={colorVariable.blue}
          variant="h5"
          display={"flex"}
          alignItems={"center"}
          gap={2}
        >
          <ShoppingBagOutlinedIcon
            sx={{ width: 35, height: 35, color: colorVariable.blue }}
          />
          ARTICLES
        </Typography>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Grid2 container spacing={2}>
            <InputText
              name="nom_article"
              label="Nom article"
              onChange={onChange}
              value={articleState.nom_article ?? ""}
            />
            <InputText
              name="quantity"
              label="Quantité"
              onChange={onChange}
              type="number"
              value={articleState.quantity ?? ""}
            />
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: colorVariable.blue,
              }}
              onClick={onSave}
            >
              {articleState.id_article === 0 ? "Enregistrer" : "Modifier"}
            </Button>
            {articleState.id_article !== 0 &&
              articleState.nom_article !== "" && (
                <Button variant="outlined" color="error" onClick={onCancel}>
                  Annuler
                </Button>
              )}
            <ButtonGroup variant="contained" color="inherit">
              <Button
                variant="contained"
                sx={{
                  bgcolor: !isGridView
                    ? colorVariable.orange
                    : colorVariable.grey,
                  color: "white",
                }}
                onClick={setIsViewAsList}
              >
                <ListIcon />
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: isGridView
                    ? colorVariable.orange
                    : colorVariable.grey,
                  color: "white",
                }}
                onClick={setIsViewAsGrid}
              >
                <GridViewIcon />
              </Button>
            </ButtonGroup>
          </Grid2>
        </Box>
      </Box>

      {isGridView ? (
        <GridView
          articles={articleProvider}
          onEdit={onEdit}
          onHandleDialog={onHandleDialog}
        />
      ) : (
        <ListView
          articles={articleProvider}
          onEdit={onEdit}
          onHandleDialog={onHandleDialog}
        />
      )}
    </Box>
  );
};