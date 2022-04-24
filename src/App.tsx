import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { PoseDetector } from "./features/pose-detection";

function Publishment() {
  return (
    <Box sx={{ my: 2 }}>
      See <Link href="https://github.com/sdobz/pose-demo">the source code</Link>
    </Box>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <PoseDetector model="posenet" type={undefined} />
      <Box sx={{ my: 4 }}>
        <Publishment />
      </Box>
    </Container>
  );
}
