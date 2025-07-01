import { Box, Button, Typography } from "@mui/material";
import { colorVariable } from "../../utils/colorVariable";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

export const Home = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [navigate, token]);

  const onNavigate = useCallback(() => {
    navigate("/articles");
  }, [navigate]);

  return (
    <Box
      display="flex"
      height="100vh"
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={5}
    >
      <img
        src={`${process.env.PUBLIC_URL}/rb_2309.png`}
        alt="Logo"
        style={{ height: 100, width: 100 }}
      />
      <Typography>Vous êtes le bienvenue dans l'application G.A</Typography>
      <Button sx={{ color: colorVariable.orange }} onClick={onNavigate}>
        Aller dans la page articles <ArrowRightAltOutlined />
      </Button>
    </Box>
  );
};