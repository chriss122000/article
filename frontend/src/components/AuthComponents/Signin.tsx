import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { colorVariable } from "../../utils/colorVariable";
// import Grid from "@mui/material/Grid2";
import Grid2 from '@mui/material/Unstable_Grid2';
import { InputText } from "../Common/InputText";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import { TUser } from "../../types/user";
import { ChangeEvent, useCallback, useState } from "react";
import { onLoginUser } from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import { InputPassword } from "../Common/InputPassword";
import { validateEmail } from "../../utils/utils";
import { toast } from "react-toastify";

export const SigninComponent = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState: TUser = {
    username: "",
    password: "",
  };

  const [userState, setUserState] = useState<TUser>({ ...initialState });
  const [emailError, setEmailError] = useState<boolean>(false);

  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = ev.target;

      setUserState({ ...userState, [name]: value });

      if (!validateEmail(userState.username)) {
        setEmailError(true);
      } else setEmailError(false);
    },
    [userState]
  );

  const onLogin = useCallback(
    async (ev: any) => {
      ev.preventDefault();
      if (!userState.username || !userState.password) {
        return;
      }

      try {
        const res = await onLoginUser({
          username: userState.username,
          password: userState.password,
        });

        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          setUserState({ ...initialState });
          navigate("/");
          window.location.reload(); //to take effect of storing access_token
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          toast("Accès invalide, veuillez réessayer !", { type: "error" });
        } else {
          console.error("An error occurred during login:", error.message);
          toast("Une erreur c'est produit, réessayer plutârd !", {
            type: "error",
          });
        }
      }
    },
    [initialState, navigate, userState.password, userState.username]
  );

  const onNavigate = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <>
      <CssBaseline />
      <Box display="flex" height="100vh">
        <Box
          width="50%"
          bgcolor={colorVariable.beige}
          justifyContent="center"
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          <img
            src={`${process.env.PUBLIC_URL}/rb_2309.png`}
            alt="Logo"
            style={{ height: 50, width: 50 }}
          />
          <Typography
            variant="h3"
            sx={{
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
                color: 'primary.main',
                letterSpacing: 1.2,
                textAlign: 'center',
                textTransform: 'uppercase',
            }}
            >
            Inventa
          </Typography>
          <Typography color={colorVariable.blue}>
            Une application de géstion d'article
          </Typography>
        </Box>
        <Box
          width="50%"
          justifyContent="center"
          display="flex"
          alignItems="center"
        >
          <Grid2
            container
            direction={"column"}
            spacing={2}
            justifyContent={"center"}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <SupervisedUserCircleOutlined
                sx={{ height: 50, width: 50, color: colorVariable.blue }}
              />
            </Box>
            <Typography color={colorVariable.blue} textAlign={"center"}>
              CONNEXION
            </Typography>
                <InputText
                label="Nom d'utilisateur"
                name="username"
                onChange={onChange}
                value={userState.username ?? ""}
                type="email"
                helperText={emailError ? "Adresse email invalide" : ""}
                error={emailError}
                />
            <Grid2>
                <InputPassword
                label="Mot de passe"
                name="password"
                onChange={onChange}
                value={userState.password ?? ""}
                />
            </Grid2>
            
            <Button
              sx={{ bgcolor: colorVariable.orange }}
              variant="contained"
              onClick={onLogin}
            >
              Connexion
            </Button>
            <Typography variant="subtitle2" textAlign={"center"}>
              Pas de compte ?
            </Typography>
            <Button
              sx={{ bgcolor: colorVariable.grey }}
              variant="contained"
              onClick={onNavigate}
            >
              Créer un compte
            </Button>
          </Grid2>
        </Box>
      </Box>
    </>
  );
};