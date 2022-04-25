import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { PoseDetector } from "./features/pose-detection";
import { useFirebase } from "./features/firebase";
import { AuthDisplay } from "./features/authentication";
import { ExerciseManager } from "./features/exercise";

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

  return (
    <Container maxWidth="sm" sx={{ p: 2, gap: 2 }}>
      <AuthDisplay authState={authState} authService={authService} />
      {loggedIn ? <ExerciseManager resourceService={resourceService} /> : null}
      {/* <PoseDetector model="posenet" type={undefined} /> */}
      <Publishment />
    </Container>
  );
}
