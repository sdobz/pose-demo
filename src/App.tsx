import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { PoseDetector } from "./features/pose-detection";
import { useFirebase } from "./features/firebase";
import { AuthDisplay } from "./features/authentication";

function Publishment() {
  return (
    <Box sx={{ my: 2 }}>
      See <Link href="https://github.com/sdobz/pose-demo">the source code</Link>
    </Box>
  );
}

export default function App() {
  // This state is shared so it is owned by App
  const { authState, authService } = useFirebase();

  return (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <AuthDisplay authState={authState} authService={authService} />
      {/* <PoseDetector model="posenet" type={undefined} /> */}
      <Box sx={{ my: 4 }}>
        <Publishment />
      </Box>
    </Container>
  );
}
