import React from "react";
import { Resource } from "../core";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

interface NotSuccessProps {
  r: Resource<any>;
  retry?: () => void;
}

export function NotSuccess({ r, retry }: NotSuccessProps) {
  if (r.error) {
    return (
      <Alert severity="error">
        {r.error} {retry ? <Button onClick={retry}>Retry</Button> : null}
      </Alert>
    );
  }
  if (r.loading) {
    return <LinearProgress />;
  }
  return null;
}
