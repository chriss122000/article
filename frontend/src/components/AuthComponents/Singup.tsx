import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { colorVariable } from "../../utils/colorVariable";
// import Grid from "@mui/material/Grid";
import Grid2 from '@mui/material/Unstable_Grid2';
import { InputText } from "../Common/InputText";
import { AppRegistrationOutlined } from "@mui/icons-material";
import { TUser } from "../../types/user";
import { ChangeEvent, useCallback, useState } from "react";
import { checkIfUserExist, onCreateUser } from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import { InputPassword } from "../Common/InputPassword";
import { validateEmail, validatePassword } from "../../utils/utils";
import { toast } from "react-toastify";

export const SignupComponent = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState: TUser & { confirmPassword: string } = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [userState, setUserState] = useState<
    TUser & { confirmPassword: string }
  >({ ...initialState });

  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = ev.target;
      setUserState({ ...userState, [name]: value });

      if (!validateEmail(userState.username)) {
        setEmailError(true);
      } else setEmailError(false);

      if (!validatePassword(userState.password)) {
        setPasswordError(true);
      } else setPasswordError(false);

      if (!validatePassword(userState.confirmPassword)) {
        setConfirmPasswordError(true);
      } else setConfirmPasswordError(false);
    },
    [userState]
  );

  const onLogin = useCallback(async () => {
    if (
      !userState.username ||
      !userState.password ||
      !userState.confirmPassword
    ) {
      return;
    }

    if (userState.password === userState.confirmPassword) {
      try {
        const isExist = await checkIfUserExist(userState.username).then(
          (res) => res.data.username
        );

        if (!isExist) {
          try {
            const res = await onCreateUser({
              username: userState.username,
              password: userState.password,
            });

            if (res.status === 200) {
              setUserState({ ...initialState });
              navigate("/signin");
              toast("Utilisateur créer avec succès !", { type: "success" });
            }
          } catch (error: any) {
            if (error.response && error.response.status === 401) {
              console.log("Invalid credentials. Please try again.");
              toast("Nom d'utilisateur ou adresse email invalide !", {
                type: "error",
              });
            } else {
              console.error("An error occurred during login:", error.message);
              toast(
                "Un erreur c'est produit lors de la création de votre compte !",
                { type: "error" }
              );
            }
          }
        } else {
          toast(
            "Nom d'utilisateur ou adresse email déjà prise, réessayer un autre !",
            { type: "error" }
          );
        }
      } catch (error: any) {
        console.error("An error occurred during login:", error);
        toast("Un erreur c'est produit lors de la création de votre compte !", {
          type: "error",
        });
      }
    } else {
      toast(
        "Les mots de passe saisis ne correspondent pas. Veuillez vérifier que le mot de passe et sa confirmation sont identiques. !",
        { type: "error" }
      );
    }
  }, [
    initialState,
    navigate,
    userState.confirmPassword,
    userState.password,
    userState.username,
  ]);

  const onNavigate = useCallback(() => {
    navigate("/signin");
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
              <AppRegistrationOutlined
                sx={{ height: 50, width: 50, color: colorVariable.blue }}
              />
            </Box>
            <Typography color={colorVariable.blue} textAlign={"center"}>
              CREATION D'UN COMPTE
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
                error={passwordError}
                />
            </Grid2>
            <Grid2>
                <InputPassword
                label="Confirmer mot de passe"
                name="confirmPassword"
                onChange={onChange}
                value={userState.confirmPassword ?? ""}
                error={confirmPasswordError}
                />
            </Grid2>
            <Button
              sx={{ bgcolor: colorVariable.orange }}
              variant="contained"
              onClick={onLogin}
            >
              Créer compte
            </Button>
            <Typography variant="subtitle2" textAlign={"center"}>
              Déjà un compte ?
            </Typography>
            <Button
              sx={{ bgcolor: colorVariable.grey }}
              variant="contained"
              onClick={onNavigate}
            >
              Connexion
            </Button>
          </Grid2>
        </Box>
      </Box>
    </>
  );
};