import React from "react";
import { TArticle } from "../../types/article";
import Grid2 from '@mui/material/Unstable_Grid2';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { colorVariable } from "../../utils/colorVariable";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface IGridView {
  articles: Array<TArticle>;
  onEdit: (article: TArticle) => (ev: any) => void;
  onHandleDialog: (id_article: number) => (ev: any) => void;
}

export const GridView: React.FC<IGridView> = ({
  articles,
  onEdit,
  onHandleDialog,
}) => {
  return (
    <Grid2 container spacing={2}>
      {!!articles &&
        articles.map((article) => (
          <Card sx={{ maxWidth: 350 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {article.nom_article}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Quantité: {article.quantity ?? 0}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                sx={{ bgcolor: colorVariable.blue, color: "white" }}
                onClick={onEdit(article)}
              >
                <EditOutlinedIcon />
              </Button>
              <Button
                sx={{ bgcolor: colorVariable.grey, color: "white" }}
                onClick={onHandleDialog(article.id_article)}
              >
                <DeleteOutlineIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
    </Grid2>
  );
};