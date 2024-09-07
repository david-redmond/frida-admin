import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert"; // Import Alert for error messages
import { httpAuth } from "../../http";
import Copyright from "../../components/Copyright";
import Routes from "../../routes";

async function registerNewUser(credentials: any) {
  try {
    const response = await httpAuth.post("/register", credentials);
    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      throw new Error("Registration failed. Please check your input.");
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
}

async function loginUser(credentials: any) {
  const response = await httpAuth.post("/login", credentials);
  window.location.href = Routes.home;
  return response.data;
}

export default function SignUp(props: any) {
  const [firstnameError, setFirstnameError] = React.useState(false);
  const [surnameError, setSurnameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null); // Reset error message
    const data = new FormData(event.currentTarget);

    const payload = {
      email: data.get("email"),
      password: data.get("password"),
      firstname: data.get("firstname"),
      surname: data.get("surname"),
    };

    // Simple validation for required fields
    setFirstnameError(!payload.firstname);
    setSurnameError(!payload.surname);
    setEmailError(!payload.email);
    setPasswordError(!payload.password);

    if (!payload.firstname || !payload.surname || !payload.email || !payload.password) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      const response = await registerNewUser(payload);
      if (response.status >= 200 && response.status <= 299) {
        const token = await loginUser({
          email: payload.email,
          password: payload.password,
        });
        props.setToken(token);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                    error={firstnameError}
                    helperText={firstnameError ? "First name is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="surname"
                    label="Last Name"
                    name="surname"
                    autoComplete="family-name"
                    error={surnameError}
                    helperText={surnameError ? "Last name is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={emailError}
                    helperText={emailError ? "Email is required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={passwordError}
                    helperText={passwordError ? "Password is required" : ""}
                />
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}
