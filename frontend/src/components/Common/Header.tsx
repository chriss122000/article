import { LogoutOutlined } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colorVariable } from "../../utils/colorVariable";
import { DialogConfirm } from "./DialogConfirm";

export const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token") ?? "";

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onNavigate = useCallback(
    (route: string) => (ev: any) => {
      ev.preventDefault();
      navigate(route);
    },
    [navigate]
  );

  const handleOpenDialog = useCallback(
    () => (ev: any) => {
      setIsOpen(!isOpen);
    },
    [isOpen]
  );

  const onLogout = useCallback(() => {
    localStorage.removeItem("access_token");
    navigate("/signin");
  }, [navigate]);

  return (
    <>
      {token ? (
        <>
          {isOpen && (
            <DialogConfirm
              isOpen={isOpen}
              onCancel={handleOpenDialog}
              onConfirm={onLogout}
              text="Voulez-vous déconnecté maintenant ?"
              title="Déconnexion"
            />
          )}
          <AppBar
            component="nav"
            sx={{ mb: 20, px: 10, bgcolor: colorVariable.blue }}
          >
            <Toolbar>
              <img
                src={`${process.env.PUBLIC_URL}/rb_2309.png`}
                alt="Logo"
                style={{ height: 50, width: 50 }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  color: colorVariable.orange,
                }}
              >
                GESTION ARTICLE
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Button
                  sx={{ color: colorVariable.orange }}
                  onClick={onNavigate("/")}
                >
                  {"Accueil"}
                </Button>
                <Button
                  sx={{ color: colorVariable.orange }}
                  onClick={onNavigate("/articles")}
                >
                  {"Article"}
                </Button>
                <Button sx={{ color: "red" }} onClick={handleOpenDialog()}>
                  <LogoutOutlined />
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </>
      ) : (
        <></>
      )}
    </>
  );
};