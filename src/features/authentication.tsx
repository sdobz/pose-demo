import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { AuthState, AuthService, useAppContext } from "../core";

export interface AuthProps {
  authService: AuthService;
}

export function getUser(authState: AuthState) {
  return authState.userInfo && "email" in authState.userInfo
    ? authState.userInfo
    : null;
}

export function getError(authState: AuthState) {
  return authState.userInfo && "error" in authState.userInfo
    ? authState.userInfo.error
    : null;
}

export function AuthDisplay({ authService }: AuthProps) {
  const { authState } = useAppContext();
  const user = getUser(authState);
  const errorMessage = getError(authState);

  return (
    <Box>
      {user ? (
        <Alert severity="info">
          Hello {user.email}{" "}
          <Button onClick={authService.logout}>Logout</Button>
        </Alert>
      ) : (
        <AuthForm authService={authService} />
      )}
      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
    </Box>
  );
}

export function AuthForm({ authService }: AuthProps) {
  const { authState } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = authState.loading;

  function fillTestCreds() {
    setEmail("vincent@khougaz.com");
    setPassword("longtest");
  }

  return (
    <Box style={{ opacity: loading ? 0.75 : 1 }}>
      <FormGroup aria-disabled={loading} sx={{ gap: 2 }}>
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />

        <ButtonGroup>
          <Button onClick={() => authService.login(email, password)}>
            Login
          </Button>
          <Button onClick={() => authService.register(email, password)}>
            Register
          </Button>
          <Button onClick={fillTestCreds}>Fill Test Credentials</Button>
        </ButtonGroup>
      </FormGroup>
    </Box>
  );
}
