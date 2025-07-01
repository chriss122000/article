import {
    Button,
    ButtonGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
  import React from "react";
  import { colorVariable } from "../../utils/colorVariable";
  import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
  import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
  import { TArticle } from "../../types/article";
  
  interface IListView {
    articles: Array<TArticle>;
    onEdit: (article: TArticle) => (ev: any) => void;
    onHandleDialog: (id_article: number) => (ev: any) => void;
  }
  
  export const ListView: React.FC<IListView> = ({
    articles,
    onEdit,
    onHandleDialog,
  }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper sx={{ overflow: "hidden", p: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: colorVariable.blue }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  ID
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "white" }}
                  align="left"
                >
                  Article
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "white" }}
                  align="right"
                >
                  Quantité
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "white" }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!articles &&
                articles.map((article) => (
                  <TableRow
                    key={article.id_article}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {article.id_article}
                    </TableCell>
                    <TableCell align="left">
                      {article.nom_article ?? ""}
                    </TableCell>
                    <TableCell align="right">{article.quantity ?? ""}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup variant="contained" color="inherit">
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
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={articles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  };