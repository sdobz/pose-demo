import React, { useEffect, useState } from "react";
import {
  Fetcher,
  LOADING_RESOURCE,
  makeError,
  makeSuccess,
  PENDING_RESOURCE,
  Resource,
  ResourceHook,
} from "../core";
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

// This is great for naive cases, but misses out
//   * sharing data between multiple instances
//   * reloading
//   * retrying
//   * live data
//   * caching
//   * skipping queries when data isn't ready
// A lib like rtk-query supports far more use cases and should be used for production
export function makeResource<T, A extends any[]>(
  name: string,
  fetcher: Fetcher<T, A>
): ResourceHook<T, A> {
  return (...args: A) => {
    const [r, setR] = useState<Resource<T>>(PENDING_RESOURCE);

    useEffect(() => {
      console.log(`[${name}] loading:`, ...args);
      setR(LOADING_RESOURCE);

      fetcher(...args)
        .then((data) => {
          console.log(`[${name}] done:`, data);
          setR(makeSuccess(data));
        })
        .catch((err) => {
          console.error(`[${name}] error:`, err);
          setR(makeError(err.message));
        });
    }, args);

    return r;
  };
}
