import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useFirebase } from "./features/firebase";
import { AuthDisplay } from "./features/authentication";
import { ExerciseManager } from "./features/exercise";
import { useMemo } from "react";
import { AppContext } from "./core";

function Publishment() {
  return (
    <Box>
      See <Link href="https://github.com/sdobz/pose-demo">the source code</Link>
    </Box>
  );
}

export default function App() {
  // This state is shared so it is owned by App
  const { authState, authService, resourceService } = useFirebase();

  const loggedIn = !!(authState.userInfo && "email" in authState.userInfo);

  const appContext = useMemo(
    () => ({
      authState,
      resourceService,
    }),
    [authState, resourceService]
  );

  return (
    <AppContext.Provider value={appContext}>
      <Container maxWidth="sm" sx={{ p: 2, gap: 2 }}>
        <AuthDisplay authService={authService} />
        {loggedIn ? <ExerciseManager /> : null}
        <Publishment />
      </Container>
    </AppContext.Provider>
  );
}
