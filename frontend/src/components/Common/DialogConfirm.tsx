import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  import React from "react";
  import { colorVariable } from "../../utils/colorVariable";
  
  interface IDialogProps {
    title: string;
    text: string;
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => (ev: any) => void;
  }
  
  export const DialogConfirm: React.FC<IDialogProps> = ({
    onCancel,
    onConfirm,
    text,
    title,
    isOpen,
  }) => {
    return (
      <Dialog
        open={isOpen}
        onClose={onCancel()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title ?? ""}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text ?? ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onCancel()}>
            Annuler
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: colorVariable.blue, color: "white" }}
            onClick={onConfirm}
            autoFocus
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    );
  };